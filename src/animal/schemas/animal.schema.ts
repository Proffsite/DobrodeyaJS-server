/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnimalDocument = Animal & Document;

export enum Type {
	CAT = 'CAT',
	HOME = 'HOME',
	DOGS = 'DOGS',
}

export enum Category {
	CATS = 'Cats',
	DOGS = 'Dogs',
	HOME = 'Home',
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

	@Prop()
	date: string;

	@Prop()
	picture: string;

	@Prop()
	sex: string;

	@Prop()
	category: Category;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
