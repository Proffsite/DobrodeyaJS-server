/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type NewDocument = New & Document;

@Schema()
export class New {
	@Prop()
	name: string;

	@Prop()
	text: string;

	@Prop({ default: Date.now })
	date: Date;

	@Prop()
	picture: string;
}

export const NewSchema = SchemaFactory.createForClass(New);
