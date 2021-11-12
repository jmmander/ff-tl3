import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BoardEntity } from '../entities/Board'
import { SectionsService } from '../sections/sections.service'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
    private sectionService: SectionsService
  ) {}

  findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ relations: ['sections', 'sections.cards'] })
  }

  create({ title }: { title: string }): Promise<BoardEntity> {
    let board = new BoardEntity()
    board.title = title
    let newBoard = this.boardsRepository.save(board)
    return newBoard
      .then((response) => {
        return this.sectionService.addDefaultSections(response.id)
      })
      .then(() => {
        return this.boardsRepository.findOne({
          relations: ['sections', 'sections.cards'],
          where: {
            title: title,
          },
        })
      })
  }
}
