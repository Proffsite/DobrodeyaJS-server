/* eslint-disable prettier/prettier */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


const start = async () => {
	try {
		const PORT = process.env.PORT || 5000;
		const app = await NestFactory.create(AppModule);
		app.useGlobalPipes(new ValidationPipe());
		app.enableCors()
		await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
