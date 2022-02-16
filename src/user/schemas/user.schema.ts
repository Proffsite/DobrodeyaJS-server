/* eslint-disable prettier/prettier */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRoles {
	ADMIN = 'admin',
	USER = 'user',
}

@Schema()
export class User extends Document {



	@Prop({ required: true })
	name: string;

	@Prop({ unique: [true, 'Такой Email уже существует'] })
	email: string;

	@Prop({ select: false })
	password?: string;

	@Prop({
		enum: UserRoles,
		default: UserRoles.USER,
	})

	role: UserRoles;
}


export const UserSchema = SchemaFactory.createForClass(User);
