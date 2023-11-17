import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleMenusDocument = RoleMenus & Document;

@Schema()
export class RoleMenus extends Document {

  @Prop()
  roleId: string;

  @Prop()
  menuId: string;
  
}


export const RoleMenusSchema = SchemaFactory.createForClass(RoleMenus);
