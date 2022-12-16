import { ImageType, InstanceOfWithDates, WithId } from './common.types';

export type UserSchema = {
    authProvider: 'credentials' | 'google'
    username: string;
    email: string;
    password?: string;
    avatar: AvatarType
};

export type AvatarType = {
    url: string | null
    public_id: string | null
}

export type UserInstance = InstanceOfWithDates<UserSchema> & {
        isValidPassword: (id: UserSchema['password']) => Promise<boolean>;
        isEqualValues: (values: Partial<UserSchema>) => boolean;
    };

export type User = WithId<UserSchema>
export type UserWithoutPassword = Omit<User, 'password'>
