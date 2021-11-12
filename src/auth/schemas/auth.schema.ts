import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose'

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);
