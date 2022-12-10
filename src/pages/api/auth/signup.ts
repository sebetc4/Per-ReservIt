import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../server/config/db.config';
import { registerUser } from '../../../server/controllers/auth.controller';
import onError from '../../../server/middlewares/errors.middleware';
import { HttpErrors, ReqMethods } from '../../../types/api.types';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    dbConnect()
    switch (req.method) {
        case ReqMethods.POST:
            await registerUser(req, res);
            break
        default:
            onError(HttpErrors.METHOD_NOT_ALLOWED, res);
    }
}