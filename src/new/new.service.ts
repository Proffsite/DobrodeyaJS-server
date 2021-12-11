/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { CreateNewDto } from "./dto/create-new.dto";
import { UpdateNewDto } from "./dto/update-new.dto";
import { New, NewDocument } from "./schemas/new.schema";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class NewService {

	constructor(@InjectModel(New.name) private newModel: Model<NewDocument>,
		private fileService: FileService) { }

	async create(dto: CreateNewDto, picture): Promise<New> {
		const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
		const news = await this.newModel.create({ ...dto, picture: picturePath })
		return news;
	}

	async getAll(count = 12, offset = 1): Promise<New[]> {
		const news = await this.newModel.find().skip(Number((offset - 1) * count)).limit(Number(count));
		return news;
	}

	async getOne(id: ObjectId): Promise<New> {
		const new1 = await this.newModel.findById(id);
		return new1;
	}

	async delete(id: ObjectId): Promise<ObjectId> {
		const new1 = await this.newModel.findByIdAndDelete(id);
		return new1._id
	}

	// async search(query: string): Promise<Animal[]> {
	//     const animals = await this.animalModel.find({
	//         // type: { query }
	//     })
	//     return animals;
	// }
	async update(id: ObjectId, newDto: UpdateNewDto): Promise<New> {
		return this.newModel.findByIdAndUpdate(id, newDto)
	}
}
