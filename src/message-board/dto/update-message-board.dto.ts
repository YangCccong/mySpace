import { PartialType } from '@nestjs/swagger';
import { CreateMessageBoardDto } from './create-message-board.dto';

export class UpdateMessageBoardDto extends PartialType(CreateMessageBoardDto) {}
