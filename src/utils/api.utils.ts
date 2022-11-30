import type { NextApiRequest, NextApiResponse } from 'next';
import onError from '../server/middlewares/errors.middleware';

export const catchError = (func: (req: NextApiRequest, res: NextApiResponse) => void) => { 
    return (req: NextApiRequest, res: NextApiResponse) =>
        Promise.resolve(func(req, res)).catch((err) => onError(err, res));
}