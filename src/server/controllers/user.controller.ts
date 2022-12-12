import type { NextApiRequest, NextApiResponse } from 'next';
import { catchError } from '../../utils/api.utils';
import { signUpSchema } from '../../utils/validationSchemas';
import { cloudinary } from '../config/cloudinary.config';
import { authUser } from '../middlewares/auth.middleware';
import onSuccess from '../middlewares/success.middleware';
import { validBody } from '../middlewares/validator.middlewares';
import { User } from '../models/User.model';
import { findUserByIdQuery } from '../queries/user.queries';

export const createUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username, password } = await validBody(signUpSchema, req);
    const registeredUser = await User.create({ email, username, password });
    onSuccess({ registeredUser }, 201, res);
});

export const getCurrentUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const {_id} = await authUser(req)
    const user = await findUserByIdQuery(_id!, '-password')
    onSuccess({ user }, 201, res);
});

export const updateUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { avatar, username, email } = req.body;
    const { _id } = await authUser(req);
    const user = await findUserByIdQuery(_id!, '-password');

    username && (user.username = username);
    email && (user.email = email);

    if (avatar) {
        user.avatar && cloudinary.v2.uploader.destroy(user.avatar.public_id);
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'reservit/avatar',
            with: 150,
            crop: 'scale',
        });
        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    await user.save();
});
