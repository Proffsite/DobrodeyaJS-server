import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Animal, AnimalDocument } from "./schemas/animal.schema";
import { Model, ObjectId } from "mongoose";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { FileService, FileType } from "../file/file.service";
import { UpdateAnimalDto } from "./dto/update-animal.dto";

@Injectable()
export class AnimalService {

    constructor(@InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
        private fileService: FileService) { }

    async create(dto: CreateAnimalDto, picture): Promise<Animal> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const animal = await this.animalModel.create({ ...dto, picture: picturePath })
        return animal;
    }

    async getAll(count = 10, offset = 0): Promise<Animal[]> {
        const animals = await this.animalModel.find().skip(Number(offset)).limit(Number(count));
        return animals;
    }

    async getOne(id: ObjectId): Promise<Animal> {
        const animal = await this.animalModel.findById(id);
        return animal;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const animal = await this.animalModel.findByIdAndDelete(id);
        return animal._id
    }

    async search(query: string): Promise<Animal[]> {
        const animals = await this.animalModel.find({
            type: { query }
        })
        console.log(animals)
        return animals;
    }
    async update(id: ObjectId, animalDto: UpdateAnimalDto): Promise<Animal> {
        return this.animalModel.findByIdAndUpdate(id, animalDto)
    }
}
