import type { NextApiResponse } from 'next';
import { ResStatus } from '../../types/api.types';

export default function onSuccess(data: {}, statusCode: number, res: NextApiResponse) {
    res.status(statusCode).json({
        status: ResStatus.SUCCESS,
        ...data
    });
}