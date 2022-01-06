/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, Put } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { Animal } from "./schemas/animal.schema";
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('/animals')
export class AnimalController {
	constructor(private animalService: AnimalService) { }

	@Post()
	@UseInterceptors(FileFieldsInterceptor([
		{ name: 'picture', maxCount: 1 },
	]))
	create(@UploadedFiles() files, @Body() dto: CreateAnimalDto) {
		const { picture } = files
		return this.animalService.create(dto, picture[0]);
	}

	@Get()
	getAll(
		@Query() query: ExpressQuery,
		@Query('count') count: number,
		@Query('offset') offset: number,
		@Query('type') type): Promise<Animal[]> {
		const data = this.animalService.getAll(query);
		return data;
	}

	// @Get()
	// search(@Query('query') query: string) {
	//     return this.animalService.search(query)
	// }

	@Get(':id')
	getOne(@Param('id') id: ObjectId): Promise<Animal> {
		return this.animalService.getOne(id);
	}

	@Delete(':id')
	async delete(@Param('id') id: ObjectId): Promise<{ deleted: boolean }> {
		await this.animalService.getOne(id);

		const animal = this.animalService.delete(id);
		if (animal) {
			return { deleted: true, }
		};
	}

	@Put(':id')
	async update(@Param('id') id: ObjectId, @Body() updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
		await this.animalService.getOne(id);

		return this.animalService.update(id, updateAnimalDto);
	}
}