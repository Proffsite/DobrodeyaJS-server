/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import * as mongoose from 'mongoose';

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
	text: string;

	@Prop()
	age: string;

	@Prop()
	date: string;

	@Prop()
	picture: string;

	@Prop()
	sex: string;

	@Prop()
	type: string;

	@Prop()
	category: Category;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
