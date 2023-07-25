import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {
  @Prop({ unique: true, request: true })
  name: String;

  @Prop()
  desc: String;

  @Prop()
  createBy: String;

  @Prop()
  modifyBy: String;

  @Prop()
  createTime: Date;

  @Prop()
  modifyTime: Date;

  @Prop()
  routes: [];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
