/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { FileService } from "../file/file.service";
import { AuthModule } from 'src/auth/auth.module';


@Module({
	imports: [
		AuthModule,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UserController],
	providers: [UserService, FileService],
	exports: [MongooseModule],
})
export class UserModule { }