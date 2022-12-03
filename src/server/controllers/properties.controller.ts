import type { NextApiRequest, NextApiResponse } from 'next';
import { PropertyType } from '../../types/properties.types';
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
    const createdProperty: PropertyType = await Property.create(req.body);
    onSuccess({ createdProperty }, 201, res);
});

export const getOneProperty = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = validQueryId(req);
    const property: PropertyType = await findPropertyByIdQuery(id);
    onSuccess({ property }, 200, res);
});

export const getAllProperties = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await findAllPropertiesQuery(req);
    onSuccess({ ...data }, 200, res);
});

export const updateProperty = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = validQueryId(req);
    const updatedProperty: PropertyType = await updatePropertyQuery(id, req.body);
    onSuccess({ updatedProperty }, 200, res);
});

export const deleteProprety = catchError(async (req: NextApiRequest, res: NextApiResponse) => {
    const id = validQueryId(req);
    await deletePropertyQuery(id);
    onSuccess({ message: 'Property is deleted' }, 200, res);
});
