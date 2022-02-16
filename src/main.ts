/* eslint-disable prettier/prettier */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


const start = async () => {
	try {
		const PORT = process.env.PORT || 5000;
		const app = await NestFactory.create(AppModule);
		app.useGlobalPipes(new ValidationPipe());
		app.enableCors({
			origin: [/^(.*)/],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			preflightContinue: false,
			optionsSuccessStatus: 200,
			credentials: true,
			allowedHeaders:
				'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
		}
		)
		await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
