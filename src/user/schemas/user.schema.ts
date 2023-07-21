import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;
  
  @Prop()
  code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
