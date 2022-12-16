import type { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../../types/api.types';
import { SignUpBody, UpdateGeneralSettingsBody } from '../../types/request.types';
import { catchError } from '../../utils/api.utils';
import { signUpSchema, updateGeneralSettingsSchema } from '../../utils/validationSchemas';
import { authUser } from '../middlewares/auth.middleware';
import onSuccess from '../middlewares/success.middleware';
import { validBody } from '../middlewares/validator.middlewares';
import { User } from '../models/User.model';
import { findUserByIdQuery } from '../queries/user.queries';

export const createUserWithCredentials = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username, password } = await validBody<SignUpBody>(signUpSchema, req);
    await User.create({ email, username, password, authProvider: 'credentials' });
    onSuccess({ message: 'User is registered' }, 201, res);
});

export const getCurrentUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const {_id} = await authUser(req)
    const user = await findUserByIdQuery(_id!, '-password')
    onSuccess({ user }, 201, res);
});

export const updateGeneralSettings = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username } = await validBody<UpdateGeneralSettingsBody>(updateGeneralSettingsSchema, req);
    const user = await authUser(req);
    if (user.isEqualValues({email, username})) {
        throw CustomError.BAD_REQUEST
    }    
    user.email = email
    user.username = username
    await user.save();
    onSuccess({ user }, 200, res);
});

// if (avatar) {
//     user.avatar && cloudinary.v2.uploader.destroy(user.avatar.public_id);
//     const result = await cloudinary.uploader.upload(req.body.avatar, {
//         folder: 'reservit/avatar',
//         with: 150,
//         crop: 'scale',
//     });
//     user.avatar = {
//         public_id: result.public_id,
//         url: result.secure_url,
//     };
// }