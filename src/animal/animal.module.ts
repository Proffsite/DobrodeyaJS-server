/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Animal, AnimalSchema } from "./schemas/animal.schema";
import { FileService } from "../file/file.service";
import { AuthModule } from '..//auth/auth.module';


@Module({
	imports: [
		AuthModule,
		MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
	],
	controllers: [AnimalController],
	providers: [AnimalService, FileService],
	exports: [MongooseModule],
})
export class AnimalModule { }
