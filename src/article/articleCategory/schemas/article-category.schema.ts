import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleCategoryDocument = ArticleCategory & Document;

@Schema()
export class ArticleCategory extends Document {
  @Prop({select: false})
  __v: number;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  parent: string;

  @Prop()
  sort: number;

  @Prop()
  state: string;
  
}


export const ArticleCategorySchema = SchemaFactory.createForClass(ArticleCategory);
