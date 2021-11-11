import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SectionEntity } from '../entities/Section'
import { Repository } from 'typeorm'

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SectionEntity)
    private sectionsRepository: Repository<SectionEntity>
  ) {}

  findAll(): Promise<SectionEntity[]> {
    return this.sectionsRepository.find({ relations: ['cards'] })
  }

  create({ boardId, title }: { boardId: number; title: string }): Promise<SectionEntity> {
    let section = new SectionEntity()
    section.title = title
    section.board_id = boardId
    return this.sectionsRepository.save(section)
  }
}
