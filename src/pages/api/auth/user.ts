import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../server/config/db.config';
import { getCurrentUser } from '../../../server/controllers/auth.controller';
import { createProperty, getAllProperties } from '../../../server/controllers/properties.controller';
import onError from '../../../server/middlewares/errors.middleware';
import { HttpErrors, ReqMethods } from '../../../types/api.types';


export default async function (req: NextApiRequest, res: NextApiResponse) {
    dbConnect()
    switch (req.method) {
        case ReqMethods.GET:
            await getCurrentUser(req, res);
            break
        default:
            onError(HttpErrors.METHOD_NOT_ALLOWED, res);
    }
}