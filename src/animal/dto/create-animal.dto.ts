/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Category } from '../schemas/animal.schema';

export class CreateAnimalDto {

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly name: string;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly age: string;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly date: string;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly text: string;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly sex: string;

	@IsString()
	@MaxLength(30)
	@IsNotEmpty()
	readonly type: string;

	@IsNotEmpty()
	@IsEnum(Category, { message: 'Пожалуйста введите корректную категорию.' })
	readonly category: Category;

}
