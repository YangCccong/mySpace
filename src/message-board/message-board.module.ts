import { Module } from '@nestjs/common';
import { MessageBoardService } from './message-board.service';
import { MessageBoardController } from './message-board.controller';

@Module({
  controllers: [MessageBoardController],
  providers: [MessageBoardService]
})
export class MessageBoardModule {}
