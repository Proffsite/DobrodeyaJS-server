/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { FileService } from "../file/file.service";
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					secret: config.get<string>('JWT_SECRET'),
					signOption: {
						expiresIn: config.get<string | number>('JWT_EXPIRES'),
					},
				};
			},
		}),
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [AuthService, FileService, JwtStrategy],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
