import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, Put } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { Animal } from "./schemas/animal.schema";


@Controller('/animals')
export class AnimalController {
    constructor(private animalService: AnimalService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAnimalDto) {
        const { picture, audio } = files
        return this.animalService.create(dto, picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number): Promise<Animal[]> {
        return this.animalService.getAll(count, offset)
    }

    @Get()
    search(@Query('query') query: string) {
        return this.animalService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.animalService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.animalService.delete(id);
    }
    @Put(':id')
    update(@Param('id') id: ObjectId, @Body() updateAnimalDto: UpdateAnimalDto) {
        return this.animalService.update(id, updateAnimalDto);
    }
}
