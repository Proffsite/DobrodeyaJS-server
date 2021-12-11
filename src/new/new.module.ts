import { Module } from "@nestjs/common";
import { NewController } from "./new.controller";
import { NewService } from "./new.service";
import { MongooseModule } from "@nestjs/mongoose";
import { New, NewSchema } from "./schemas/new.schema";
import { FileService } from "../file/file.service";


@Module({
	imports: [
		MongooseModule.forFeature([{ name: New.name, schema: NewSchema }]),
	],
	controllers: [NewController],
	providers: [NewService, FileService]
})
export class NewModule { }
