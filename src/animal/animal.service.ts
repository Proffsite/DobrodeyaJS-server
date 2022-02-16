/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Animal, AnimalDocument } from "./schemas/animal.schema";
import { Model, ObjectId } from "mongoose";
import * as mongoose from 'mongoose';
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { FileService, FileType } from "../file/file.service";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { Query } from 'express-serve-static-core';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AnimalService {

	constructor(
		@InjectModel(Animal.name)
		private animalModel: Model<AnimalDocument>,
		private fileService: FileService) { }



	async create(dto: CreateAnimalDto, user: User, picture): Promise<Animal> {
		const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
		const data = Object.assign(dto, { user: user._id, picture: picturePath });
		const res = await this.animalModel.create(data);
		return res;
	}




	async getAll(query: Query): Promise<Animal[]> {
		const resPerPage = 6;
		const currentPage = Number(query.page) || 1;
		const skip = resPerPage * (currentPage - 1);
		const keyword = query.keyword
			? {
				category: {
					$regex: query.keyword as string,
					$options: 'i',
				},
			}
			: {};


		//  if (type == '') {
		//  	const animals = await this.animalModel.find().limit(Number(count)).skip(Number(offset));
		//  	return animals;
		//  }
		// if (keyword == '') {
		// 	const animals = await this.animalModel.find({ type }).limit(Number(count)).skip(Number((offset - 1) * count));
		// 	return animals;
		// }
		const animals = await this.animalModel
			.find({ ...keyword })
			.limit(resPerPage)
			.skip(skip);
		return animals;
	}

	async getOne(id: string): Promise<Animal> {
		const isValidId = mongoose.isValidObjectId(id);

		if (!isValidId) {
			throw new BadRequestException(
				'Ошибка в объект ИД монгусс. Пожалуйста введите корректный ИД.',
			);
		}

		const res = await this.animalModel.findById(id);
		if (!res) {
			throw new NotFoundException('Animal not found.');
		}
		return res;
	}

	async delete(id: string): Promise<Animal> {

		const animal = await this.animalModel.findByIdAndDelete(id);
		return animal._id
	}

	// async search(query: string): Promise<Animal[]> {
	//     const animals = await this.animalModel.find({
	//         // type: { query }
	//     })
	//     return animals;
	// }
	async update(id: string, animalDto: UpdateAnimalDto): Promise<Animal> {
		return await this.animalModel.findByIdAndUpdate(id, animalDto, {
			new: true,
			runValidators: true,
		})
	}
}
