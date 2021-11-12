import { Controller, Get, Post, Body, Logger } from '@nestjs/common'
import { BoardEntity } from 'src/entities/Board'
import { BoardsService } from './boards.service'

@Controller('boards')
export class BoardsController {
  private readonly logger = new Logger(BoardsController.name)

  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<BoardEntity[]> {
    this.logger.log('GET /boards')
    return this.boardsService.findAll()
  }

  @Post()
  addBoard(@Body() board: { title: string }): Promise<BoardEntity> {
    this.logger.log('POST /boards')
    return this.boardsService.create(board)
  }
}
