import { HttpErrors } from '../../types/api.types';
import { UserInstance, UserSchema } from '../../types/user.types';
import { User } from '../models/User.model';

export const findUserByIdQuery = async (id: string, selectOptions?: string) => {
    const user: UserInstance | null = selectOptions
        ? await User.findById(id).select(selectOptions)
        : await User.findById(id);
    if (!user) {
        throw HttpErrors.NOT_FOUND;
    }
    return user;
};

export const findUserByEmail = async (email: UserSchema['email']) => {
    const user: UserInstance | null = await User.findOne({ email });
    if (!user) {
        throw new Error(HttpErrors.WRONG_EMAIL.message);
    }
    return user;
};
