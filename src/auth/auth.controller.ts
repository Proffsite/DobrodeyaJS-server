import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-Auth.dto";
import { ObjectId } from "mongoose";
import { UpdateAuthDto } from "./dto/update-Auth.dto";


@Controller('/auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Post()
    create(@Body() dto: CreateAuthDto) {

        return this.AuthService.create(dto);
    }

    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number) {
        return this.AuthService.getAll(count, offset)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.AuthService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.AuthService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.AuthService.delete(id);
    }
}
