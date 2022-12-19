import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../server/config/db.config';
import { forgotPassword } from '../../../../server/controllers/user.controller';
import onError from '../../../../server/middlewares/errors.middleware';
import { CustomError, ReqMethods } from '../../../../types/api.types';



export default async function(req: NextApiRequest, res: NextApiResponse) {
    dbConnect()
    switch (req.method) {
        case ReqMethods.POST:
            await forgotPassword(req, res)
            break
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}