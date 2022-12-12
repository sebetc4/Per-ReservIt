import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { ImageType, WithIdAndTimestamps } from './common.types';

export type UserSchema = {
    username: string;
    email: string;
    password: string;
    avatar?: ImageType;
};

export type UserInstance = HydratedDocument<UserSchema> &
    SchemaTimestampsConfig & {
        isValidPassword: (id: UserSchema['password']) => Promise<boolean>;
    };

export type User = WithIdAndTimestamps<UserSchema>
export type UserWithoutPassword = Omit<User, 'password'>
