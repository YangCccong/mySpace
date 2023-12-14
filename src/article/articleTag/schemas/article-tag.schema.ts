import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleTagDocument = ArticleTag & Document;

@Schema()
export class ArticleTag extends Document {

  @Prop({
    versionKey: false
  })
  name: string;
  
}


export const ArticleTagSchema = SchemaFactory.createForClass(ArticleTag);
