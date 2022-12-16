import type { NextApiResponse } from 'next';
import { CustomError, ResStatus } from '../../types/api.types';
import { isDevEnv } from '../../utils/constants.utils';

export class CustomHttpError {
    status: ResStatus.ERROR;
    message: string;
    error?: Error;
    stack?: string;
    
    constructor(err: Error | CustomError) {
        this.status = ResStatus.ERROR;
        // Message
        if (isDevEnv || !(err instanceof Error)) {
            this.message = err.message;
        } else if (err.name === 'ValidationError') {
            this.message = 'Invalid request';
        } else {
            this.message = 'Internal server error';
        }
        // Dev infos
        if (isDevEnv && err instanceof Error) {
            this.error = err;
            this.stack = err.stack;
        }
    }
}

export default function onError(err: Error | CustomError, res: NextApiResponse) {
    const error = new CustomHttpError(err);
    let statusCode: number
    if (!(err instanceof Error)) {
        statusCode = err.statusCode;
    } else if (err.name === 'ValidationError'){
        statusCode = 400
    } else {
        statusCode = 500
    }
    res.status(statusCode).json(error);
}
