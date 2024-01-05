import { Test, TestingModule } from '@nestjs/testing';
import { MessageBoardController } from './message-board.controller';
import { MessageBoardService } from './message-board.service';

describe('MessageBoardController', () => {
  let controller: MessageBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageBoardController],
      providers: [MessageBoardService],
    }).compile();

    controller = module.get<MessageBoardController>(MessageBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
