import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrantDocument = Registrant & Document;

@Schema({
  timestamps: true,
})
export class Registrant {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const RegistrantSchema = SchemaFactory.createForClass(Registrant);
