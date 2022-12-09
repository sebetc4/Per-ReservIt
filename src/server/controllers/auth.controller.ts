import type { NextApiRequest, NextApiResponse } from 'next';
import onSuccess from '../middlewares/success.middleware';
import { catchError } from '../../utils/api.utils';
import { User } from '../models/User.model';
import { validBody } from '../middlewares/validator.middlewares';
import { signUpSchema } from '../../utils/validationSchemas';

export const registerUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username, password } = await validBody(signUpSchema, req);
    const registeredUser = await User.create({ email, username, password });
    onSuccess({ registeredUser }, 201, res);
});
