import type { NextApiRequest, NextApiResponse } from 'next';
import { catchError } from '../../utils/api.utils';
import { cloudinary } from '../config/cloudinary.config';

export const updateUser = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'reservit/avatar',
        with: 150,
        crop: 'scale',
    })

    const avatar = {
        public_id : result.public_id,
        url: result.secure_url,
    }
});
