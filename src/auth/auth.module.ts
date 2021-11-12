import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "./schemas/auth.schema";
import { FileService } from "../file/file.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService, FileService]
})
export class AuthModule { }
