/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { AnimalModule } from "./animal/animal.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import * as path from 'path'
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./auth/auth.module";
import { NewModule } from './new/new.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.development`,
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
		MongooseModule.forRoot(process.env.DB_URI_LOCAL),
		AnimalModule,
		NewModule,
		AuthModule,
		FileModule
	]
})
export class AppModule { }
