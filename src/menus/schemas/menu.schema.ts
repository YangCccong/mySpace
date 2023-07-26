import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu extends Document {
    @Prop()
    name: string;

    @Prop()
    parentId: string;

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

    @Prop()
    menuFunctions?: [];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
