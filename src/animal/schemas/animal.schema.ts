import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AnimalDocument = Animal & Document;

export enum Type {
	CAT = 'CAT',
	HOME = 'HOME',
	DOGS = 'DOGS',
}

@Schema()
export class Animal {
	@Prop()
	name: string;

	@Prop()
	type: string;

	@Prop()
	age: string;

	@Prop()
	text: string;

	@Prop({ default: Date.now })
	date: Date;

	@Prop()
	picture: string;

	@Prop()
	sex: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
