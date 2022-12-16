import { ObjectId } from 'mongoose';
import { CustomError } from '../../types/api.types';
import { UserInstance, UserSchema } from '../../types/user.types';
import { User } from '../models/User.model';

export const findUserByIdQuery = async (_id: ObjectId, selectOptions?: string) => {
    const user: UserInstance | null = selectOptions
        ? await User.findById(_id).select(selectOptions)
        : await User.findById(_id);
    if (!user) {
        throw CustomError.NOT_FOUND;
    }
    return user;
};

export const findUserByEmail = async (email: UserSchema['email']) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(CustomError.WRONG_EMAIL.message);
    }
    return user;
};
