import type { NextApiRequest, NextApiResponse } from 'next';
import onError from '../server/middlewares/errors.middleware';
import { ReqMethods } from '../types/api.types';

export const catchError = (func: (req: NextApiRequest, res: NextApiResponse) => void) => { 
    return (req: NextApiRequest, res: NextApiResponse) =>
        Promise.resolve(func(req, res)).catch((err) => onError(err, res));
}

type Route = {
    method: ReqMethods
    cb: () => void
}
