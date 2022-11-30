import { HydratedDocument, ObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IPropertyModel } from '../../types/models.types';
import onSuccess from '../middlewares/success.middleware';
import { Property } from '../models/Property.model';
import { catchError } from '../../utils/api.utils';
import {
    deletePropertyQuery,
    findAllPropertiesQuery,
    findPropertyByIdQuery,
    updatePropertyQuery,
} from '../queries/propreties.queries';
import { validQueryId } from '../middlewares/validator.middlewares';

export const createProperty = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const createdProperty: HydratedDocument<IPropertyModel> = await Property.create(req.body);
    onSuccess({ createdProperty }, 201, res);
});

export const getOneProperty = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = validQueryId(req);
    const property: HydratedDocument<IPropertyModel> = await findPropertyByIdQuery(id);
    onSuccess({ property }, 200, res);
});

export const getAllProperties = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await findAllPropertiesQuery(req);
    onSuccess({ ...data }, 200, res);
});

export const updateProperty = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = validQueryId(req);
    const updatedProperty: HydratedDocument<IPropertyModel> = await updatePropertyQuery(id, req.body);
    onSuccess({ updatedProperty }, 200, res);
});

export const deleteProprety = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = validQueryId(req);
    await deletePropertyQuery(id);
    onSuccess({ message: 'Property is deleted' }, 200, res);
});
