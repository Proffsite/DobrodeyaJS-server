import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Date } from "mongoose";

export class CreateAnimalDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly age: string;

    @IsDate()
    @MaxLength(30)
    @IsNotEmpty()
    readonly date: Date;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly text: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly sex: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly type: string;
}
