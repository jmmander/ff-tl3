import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BoardEntity } from '../entities/Board'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'
import { SectionsService } from '../section.service.mock'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}))

describe('BoardsController', () => {
  let controller: BoardsController
  let service: BoardsService
  let repositoryMock: MockType<Repository<BoardEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        BoardsService,
        SectionsService,
        {
          provide: getRepositoryToken(BoardEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<BoardsController>(BoardsController)
    service = module.get<BoardsService>(BoardsService)
    repositoryMock = module.get(getRepositoryToken(BoardEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call save on board repository', async () => {
    const board = new BoardEntity()
    board.title = 'test'
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(board))
    expect(await controller.addBoard({ title: 'test' })).toBe(board)
  })
})
