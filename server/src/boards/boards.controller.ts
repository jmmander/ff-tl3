import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('boards')
export class BoardsController {
  @Get()
  index() {
    return 'board controller'
  }

  @Post('create')
  create(@Body() data): any {
    return data
  }
}
