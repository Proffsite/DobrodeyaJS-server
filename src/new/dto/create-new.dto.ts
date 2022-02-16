/* eslint-disable prettier/prettier */
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Date } from "mongoose";

export class CreateNewDto {

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly name: string;

	@IsDate()
	@MaxLength(30)
	@IsNotEmpty()
	readonly date: Date;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly text: string;
}
