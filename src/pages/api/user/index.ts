import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../server/config/db.config';
import { createUser, getCurrentUser, updateUser } from '../../../server/controllers/user.controller';
import onError from '../../../server/middlewares/errors.middleware';
import { HttpErrors, ReqMethods } from '../../../types/api.types';

export default async function userRouter (req: NextApiRequest, res: NextApiResponse) {
    dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getCurrentUser(req, res);
            break;
        case ReqMethods.POST:
            await createUser(req, res);
            break;
        case ReqMethods.PUT:
            await updateUser(req, res);
        default:
            onError(HttpErrors.METHOD_NOT_ALLOWED, res);
    }
}
