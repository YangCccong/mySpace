import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document {
  @Prop({select: false})
  __v: Number;

  @Prop()
  abstractContent: String;

  @Prop()
  author: String;

  @Prop()
  disableComment: String;

  @Prop()
  fullContent: String;

  @Prop()
  imageURL: String;

  @Prop()
  importance: String;

  @Prop()
  pageviews: String;

  // @Prop()
  // platforms: [];

  @Prop()
  reviewer: String;

  @Prop()
  sourceURL: String;

  @Prop()
  status: String;

  @Prop()
  timestamp: String;

  @Prop()
  title: String;

  @Prop()
  type: String;

}

export const ArticleSchema = SchemaFactory.createForClass(Article);
