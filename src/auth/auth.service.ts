import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Auth, AuthDocument } from "./schemas/auth.schema";
import { Model, ObjectId } from "mongoose";
import { CreateAuthDto } from "./dto/create-Auth.dto";
import { UpdateAuthDto } from "./dto/update-Auth.dto";

@Injectable()
export class AuthService {

    constructor(@InjectModel(Auth.name) private AuthModel: Model<AuthDocument>) { }

    async create(dto: CreateAuthDto): Promise<Auth> {

        const Auth = await this.AuthModel.create({ ...dto })
        return Auth;
    }

    async getAll(count = 10, offset = 0): Promise<Auth[]> {
        const Auths = await this.AuthModel.find().skip(Number(offset)).limit(Number(count));
        return Auths;
    }

    async getOne(id: ObjectId): Promise<Auth> {
        const Auth = await this.AuthModel.findById(id);
        return Auth;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const Auth = await this.AuthModel.findByIdAndDelete(id);
        return Auth._id
    }

    async search(query: string): Promise<Auth[]> {
        const Auths = await this.AuthModel.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        return Auths;
    }
}
