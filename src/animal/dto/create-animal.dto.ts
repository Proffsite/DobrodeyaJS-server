/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from '../../auth/schemas/user.schema';
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
	
	@IsEmpty({ message: 'You cannot provide the user ID.' })
	readonly user: User;
}
