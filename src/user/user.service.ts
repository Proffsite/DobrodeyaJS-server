/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { User, UserDocument } from "./schemas/user.schema";
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';


@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,
	) { }


	async getOne(id: string): Promise<User> {
		const isValidId = mongoose.isValidObjectId(id);

		if (!isValidId) {
			throw new BadRequestException(
				'Ошибка в объект ИД монгусс. Пожалуйста введите корректный ИД.',
			);
		}

		const res = await this.userModel.findById(id);
		if (!res) {
			throw new NotFoundException('User not found.');
		}
		return res;
	}
}