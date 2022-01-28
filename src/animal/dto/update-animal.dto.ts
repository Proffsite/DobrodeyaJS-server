/* eslint-disable prettier/prettier */
import {
	IsEmpty,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
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

	@IsEmpty({ message: 'You cannot provide the user ID.' })
	readonly user: User;
}