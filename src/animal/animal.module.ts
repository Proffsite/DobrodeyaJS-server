import { Module } from "@nestjs/common";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Animal, AnimalSchema } from "./schemas/animal.schema";
import { FileService } from "../file/file.service";


@Module({
	imports: [
		MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
	],
	controllers: [AnimalController],
	providers: [AnimalService, FileService]
})
export class AnimalModule { }
