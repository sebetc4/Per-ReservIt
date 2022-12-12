// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../server/config/db.config';
import { createProperty, getAllProperties } from '../../../server/controllers/properties.controller';
import onError from '../../../server/middlewares/errors.middleware';
import { HttpErrors, ReqMethods } from '../../../types/api.types';


export default async function propertiesRouter (req: NextApiRequest, res: NextApiResponse) {
    dbConnect()
    switch (req.method) {
        case ReqMethods.GET:
            await getAllProperties(req, res);
            break
        case ReqMethods.POST:
            await createProperty(req, res)
            break
        default:
            onError(HttpErrors.METHOD_NOT_ALLOWED, res);
    }
}
