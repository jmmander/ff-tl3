import { Test, TestingModule } from '@nestjs/testing'
import { SectionEntity } from '../entities/Section'
import { Repository } from 'typeorm'
import { SectionsController } from './sections.controller'
import { SectionsService } from './sections.service'
import { getRepositoryToken } from '@nestjs/typeorm'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}))

describe('SectionController', () => {
  let controller: SectionsController
  let service: SectionsService
  let repositoryMock: MockType<Repository<SectionEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsController],
      providers: [
        SectionsService,
        {
          provide: getRepositoryToken(SectionEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<SectionsController>(SectionsController)
    service = module.get<SectionsService>(SectionsService)
    repositoryMock = module.get(getRepositoryToken(SectionEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call findAll on sections repository', async () => {
    const section = new SectionEntity()
    const sectionList = [section]
    section.title = 'test'
    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(sectionList))
    expect(await controller.getAllSections()).toBe(sectionList)
  })

  it('should call create on sections repository', async () => {
    const section = new SectionEntity()
    section.title = 'test'
    section.board_id = 1
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(section))
    expect(await controller.addSection({ boardId: 1, title: 'test' })).toBe(section)
  })
})
