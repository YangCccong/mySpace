import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipe/validation/validation.pipe';
import { MessageBoardService } from './message-board.service';
import { CreateMessageBoardDto } from './dto/create-message-board.dto';
import { UpdateMessageBoardDto } from './dto/update-message-board.dto';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('留言板')
@Controller('message-board')
export class MessageBoardController {
  constructor(private readonly messageBoardService: MessageBoardService) {}

  @ApiOperation({ summary: '留言板 --- post', description: ''})
  // 使用验证管道
  @UsePipes(new ValidationPipe())
  @Post('/post')
  create(@Body() createMessageBoardDto: CreateMessageBoardDto) {
    console.log(createMessageBoardDto, 'createMessageBoardDto ====>>>> ')
    return this.messageBoardService.create(createMessageBoardDto);
  }

  @ApiOperation({ summary: '留言板 --- Get', description: ''})
  @Get()
  findAll() {
    return this.messageBoardService.findAll();
  }

  @ApiOperation({ summary: '留言板 --- Get:id', description: ''})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageBoardService.findOne(+id);
  }

  @ApiOperation({ summary: '留言板 --- Patch:id', description: ''})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageBoardDto: UpdateMessageBoardDto) {
    return this.messageBoardService.update(+id, updateMessageBoardDto);
  }

  @ApiOperation({ summary: '留言板 --- Delete:id', description: ''})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageBoardService.remove(+id);
  }
}
