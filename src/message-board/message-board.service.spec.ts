import { Test, TestingModule } from '@nestjs/testing';
import { MessageBoardService } from './message-board.service';

describe('MessageBoardService', () => {
  let service: MessageBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageBoardService],
    }).compile();

    service = module.get<MessageBoardService>(MessageBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
