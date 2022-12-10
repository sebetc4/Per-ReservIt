import { HydratedDocument, SchemaTimestampsConfig } from "mongoose";

export type UserType = HydratedDocument<IUserSchema> & SchemaTimestampsConfig;

export interface IUserSchema {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}