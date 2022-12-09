import { isObjectIdOrHexString, ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';
import { ObjectSchema } from 'yup';
import { HttpErrors } from '../../types/api.types';
import { isDevEnv } from '../../utils/constants.utils';

export const validQueryId = (req: NextApiRequest): ObjectId => {
    if (!isObjectIdOrHexString(req.query.id)) {
        throw isDevEnv ? HttpErrors.INVALID_QUERY_ID : HttpErrors.BAD_REQUEST;
    } else {
        return req.query.id as unknown as ObjectId;
    }
};

export const validBody = async (schema: ObjectSchema<any>, req: NextApiRequest) => {
        await schema.validate(req.body);
        return req.body;
}
