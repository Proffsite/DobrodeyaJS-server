/* eslint-disable prettier/prettier */
import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import { Category } from '../schemas/animal.schema';

export class UpdateAnimalDto {
	@IsString()
	@IsOptional()
	@MaxLength(30)
	@IsNotEmpty()
	readonly name: string;

	@IsString()
	@IsOptional()
	@MaxLength(30)
	@IsNotEmpty()
	readonly age: string;

	@IsString()
	@IsOptional()
	@MaxLength(30)
	@IsNotEmpty()
	readonly date: string;

	@IsString()
	@IsOptional()
	@MaxLength(30)
	@IsNotEmpty()
	readonly text: string;

	@IsString()
	@IsOptional()
	@MaxLength(30)
	@IsNotEmpty()
	readonly sex: string;

	@IsString()
	@IsOptional()
	@MaxLength(30)
	@IsNotEmpty()
	readonly type: string;

	@IsNotEmpty()
	@IsOptional()
	@IsEnum(Category, { message: 'Пожалуйста введите корректную категорию.' })
	readonly category: Category;
}