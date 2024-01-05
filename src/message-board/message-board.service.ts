import { Injectable } from '@nestjs/common';
import { CreateMessageBoardDto } from './dto/create-message-board.dto';
import { UpdateMessageBoardDto } from './dto/update-message-board.dto';

@Injectable()
export class MessageBoardService {
  create(createMessageBoardDto: CreateMessageBoardDto) {
    return 'This action adds a new messageBoard';
  }

  findAll() {
    return `This action returns all messageBoard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageBoard`;
  }

  update(id: number, updateMessageBoardDto: UpdateMessageBoardDto) {
    return `This action updates a #${id} messageBoard`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageBoard`;
  }
}
