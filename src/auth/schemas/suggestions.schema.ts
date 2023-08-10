import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuggestionsDocument = Suggestions & Document;

@Schema()
export class Suggestions extends Document {
  @Prop()
  name: String;
  
  @Prop()
  content: String;
}

export const SuggestionsSchema = SchemaFactory.createForClass(Suggestions);
