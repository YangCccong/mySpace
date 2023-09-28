import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRolesDocument = UserRoles & Document;

@Schema()
export class UserRoles extends Document {
  @Prop()
  userId: string;

  @Prop()
  rolesIds: string;
}


export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
