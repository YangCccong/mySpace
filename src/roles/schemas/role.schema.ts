import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {
  @Prop()
  name: string;

  @Prop()
  desc: string;

  @Prop()
  createBy: string;

  @Prop()
  modifyBy: string;

  @Prop()
  createTime: Date;

  @Prop()
  modifyTime: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
