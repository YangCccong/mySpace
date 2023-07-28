import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu extends Document {
    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop()
    permissionCode: string;

    @Prop()
    parentId: string;

    @Prop()
    hidden: boolean;

    @Prop()
    jumpMethod: string;

    @Prop()
    path: string;

    @Prop()
    icon: string;

    @Prop()
    sort: number;

    @Prop()
    state: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
