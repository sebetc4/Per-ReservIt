import type { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../../types/api.types';
import {
    ForgotPasswordBody,
    SignUpBody,
    UpdateAccountBody,
    UpdatePasswordBody,
    UpdateProfileBody,
} from '../../types/request.types';
import { catchError } from '../../utils/api.utils';
import { isDevEnv } from '../../utils/constants.utils';
import {
    forgotPasswordSchema,
    signUpSchema,
    updateAccountSchema,
    updatePasswordSchema,
    updateProfileSchema,
} from '../../utils/validationSchemas';
import { cloudinary } from '../config/cloudinary.config';
import { sendResetPasswordEmail } from '../config/nodemailer.config';
import { authUser } from '../middlewares/auth.middleware';
import onSuccess from '../middlewares/success.middleware';
import { validBody } from '../middlewares/validator.middlewares';
import { User } from '../models/User.model';
import { findUserByEmail } from '../queries/user.queries';

export const signUp = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username, password } = await validBody<SignUpBody>(signUpSchema, req);
    await User.create({ email, username, password, authProvider: 'credentials' });
    onSuccess({ message: 'User is registered' }, 201, res);
});

export const updateAccount = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, username } = await validBody<UpdateAccountBody>(updateAccountSchema, req);
    const user = await authUser(req);
    if (user.isEqualValues({ email, username })) {
        throw CustomError.BAD_REQUEST;
    }
    user.email = email;
    user.username = username;
    await user.save();
    const session = user.getSession();
    onSuccess({ session }, 200, res);
});

export const updateProfile = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { avatar } = await validBody<UpdateProfileBody>(updateProfileSchema, req);
    const user = await authUser(req);
    if (avatar) {
        user.avatar.public_id && cloudinary.destroy(user.avatar.public_id);
        const result = await cloudinary.upload(avatar, {
            folder: `reservit/${isDevEnv ? 'development' : 'production'}/avatar`,
            with: 150,
            crop: 'scale',
        });
        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }
    await user.save();
    const session = user.getSession();
    onSuccess({ session }, 200, res);
});

export const updatePassword = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { currentPassword, newPassword } = await validBody<UpdatePasswordBody>(updatePasswordSchema, req);
    const user = await authUser(req);
    console.log(user);
    if (user.authProvider !== 'credentials') {
        throw CustomError.BAD_REQUEST;
    }
    if (!(await user.isValidPassword(currentPassword))) {
        throw CustomError.WRONG_PASSWORD;
    }
    user.password = newPassword;
    await user.save();
    onSuccess({ message: 'Password is changed' }, 200, res);
});

export const forgotPassword = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = await validBody<ForgotPasswordBody>(forgotPasswordSchema, req);
    const user = await findUserByEmail(email);
    const resetToken = user.getResetPasswordToken();
    const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;
    try {
        await sendResetPasswordEmail({ email: user.email, username: user.username, resetUrl });
        onSuccess({ message: 'Email sent' }, 200, res);
    } catch (err) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        user.save();
        throw err;
    }
});
