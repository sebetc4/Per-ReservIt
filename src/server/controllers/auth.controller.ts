import type { NextApiRequest, NextApiResponse } from 'next';
import onSuccess from '../middlewares/success.middleware';
import { catchError } from '../../utils/api.utils';
import { User } from '../models/User.model';
import { validBody } from '../middlewares/validator.middlewares';
import { signUpSchema } from '../../utils/validationSchemas';
import { authUser } from '../middlewares/auth.middleware';

export const registerUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username, password } = await validBody(signUpSchema, req);
    const registeredUser = await User.create({ email, username, password });
    onSuccess({ registeredUser }, 201, res);
});

export const getCurrentUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const {_id} = await authUser(req)
    const user = await User.findById(_id).select('-password')
    onSuccess({ user }, 201, res);
});
