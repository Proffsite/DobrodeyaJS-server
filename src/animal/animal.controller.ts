/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, Put, UseGuards, ForbiddenException } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { Animal } from "./schemas/animal.schema";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';


@Controller('/animals')
export class AnimalController {
	constructor(private animalService: AnimalService) { }

	@Get()
	getAll(
		@Query() query: ExpressQuery): Promise<Animal[]> {
		const data = this.animalService.getAll(query);
		return data;
	}
	
	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin', 'user')
	@UseInterceptors(FileFieldsInterceptor([
		{ name: 'picture', maxCount: 1 },
	]))
	create(
		@Body() dto: CreateAnimalDto,
		@CurrentUser() user: User,
		@UploadedFiles() files,)
		{
		const { picture } = files
		return this.animalService.create(dto,user, picture[0]);
	}


	@Get(':id')
	getOne(
		@Param('id')
		id: string,
		): Promise<Animal> {
		return this.animalService.getOne(id);
	}


	@Put(':id')
	@UseGuards(AuthGuard())
	async update(
		@Param('id')
		id: string,
		@Body() updateAnimalDto: UpdateAnimalDto,
		@CurrentUser() user: User,
		): Promise<Animal> {

		const res = await this.animalService.getOne(id);

		if (res.user.toString() !== user._id.toString() ) {
			throw new ForbiddenException('You can not update this animal.');
		}
		return this.animalService.update(id, updateAnimalDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard())
	async delete(
		@Param('id')
		id: string,
		@CurrentUser() user: User,
		): Promise<{ deleted: boolean }> {

		const res = await this.animalService.getOne(id);

		if (res.user.toString() !== user._id.toString()) {
			throw new ForbiddenException('You can not delete this restaurant.');
		  }


		const animal = this.animalService.delete(id);
		if (animal) {
			return { deleted: true, }
		};
	}


}