import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BoardEntity } from '../entities/Board'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ relations: ['sections'] })
  }

  create({ title }: { title: string }): Promise<BoardEntity> {
    let board = new BoardEntity()
    board.title = title
    return this.boardsRepository.save(board)
  }
}
