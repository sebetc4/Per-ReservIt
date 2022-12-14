import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../server/config/db.config';
import { deleteProprety, getOneProperty, updateProperty } from '../../../server/controllers/properties.controller';
import onError from '../../../server/middlewares/errors.middleware';
import { CustomError, ReqMethods } from '../../../types/api.types';

export default async function propertyRouter (req: NextApiRequest, res: NextApiResponse) {
    dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getOneProperty(req, res);
            break;
        case ReqMethods.PUT:
            await updateProperty(req, res);
            break;
        case ReqMethods.DELETE:
            await deleteProprety(req, res);
            break;
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
