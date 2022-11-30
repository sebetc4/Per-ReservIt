import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpErrors, ResStatus } from '../../types/api.types';
import { isDevEnv } from '../../utils/constants.utils';

interface IError {
    status: ResStatus;
    message: string;
    error?: Error;
    stack?: string;
}

export default function onError(err: Error | HttpErrors, res: NextApiResponse) {
    const isInstanceOfError = err instanceof Error;
    const statusCode = isInstanceOfError ? 500 : err.statusCode;
    const error: IError = {
        status: ResStatus.ERROR,
        message: !isDevEnv && err instanceof Error ? 'Internal server error' : err.message,
    };
    if (isDevEnv && err instanceof Error) {
        error.error = err;
        error.stack = err.stack;
    }
    res.status(statusCode).json(error);
}
