/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { AnimalModule } from "./animal/animal.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import * as path from 'path'
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./auth/auth.module";
import { NewModule } from './new/new.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
		MongooseModule.forRoot('mongodb+srv://adminmerc:Zas321qaz_@mercecommerce.tg45i.mongodb.net/dobrodeya?retryWrites=true&w=majority'),
		AnimalModule,
		NewModule,
		AuthModule,
		FileModule
	]
})
export class AppModule { }
