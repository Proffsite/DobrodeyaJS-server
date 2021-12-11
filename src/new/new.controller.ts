/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, Put } from "@nestjs/common";
import { NewService } from "./new.service";
import { CreateNewDto } from "./dto/create-new.dto";
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UpdateNewDto } from "./dto/update-new.dto";
import { New } from "./schemas/new.schema";


@Controller('/news')
export class NewController {
	constructor(private newService: NewService) { }

	@Post()
	@UseInterceptors(FileFieldsInterceptor([
		{ name: 'picture', maxCount: 2 },
	]))
	create(@UploadedFiles() files, @Body() dto: CreateNewDto) {
		const { picture } = files
		return this.newService.create(dto, picture[0]);
	}

	@Get()
	getAll(
		@Query('count') count: number,
		@Query('offset') offset: number): Promise<New[]> {
		const data = this.newService.getAll(count, offset);
		return data;
	}

	// @Get()
	// search(@Query('query') query: string) {
	//     return this.animalService.search(query)
	// }

	@Get(':id')
	getOne(@Param('id') id: ObjectId) {
		return this.newService.getOne(id);
	}

	@Delete(':id')
	delete(@Param('id') id: ObjectId) {
		return this.newService.delete(id);
	}
	@Put(':id')
	update(@Param('id') id: ObjectId, @Body() updateNewDto: UpdateNewDto) {
		return this.newService.update(id, updateNewDto);
	}
}