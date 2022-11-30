import { HydratedDocument, ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';
import { HttpErrors } from '../../types/api.types';
import { IPropertyModel } from '../../types/models.types';
import { propertiesPerPage } from '../../utils/constants.utils';
import { Property } from '../models/Property.model';

export const findAllPropertiesQuery = async (req: NextApiRequest) => {
    const allowedFilter: string[] = ['accommodation.pricePerNight'];

    const location = req.query.location;
    const filters = req.query;
    const currentPage = Number(req.query.page) || 1;

    const locationParams =
        typeof location === 'string' && location?.trim()
            ? {
                  $or: [
                      { city: { $regex: location, $options: 'i' } },
                      { address: { $regex: location, $options: 'i' } },
                      { postcode: { $regex: location, $options: 'i' } },
                  ],
              }
            : {};

    Object.keys(filters).forEach((key) => {
        if (!allowedFilter.includes(key)) {
            delete filters[key];
        }
    });
    const propertiesCount = await Property.find({ ...locationParams, ...filters }).count();
    const properties: HydratedDocument<IPropertyModel>[] | [] = await Property.find({ ...locationParams, ...filters })
        .limit(propertiesPerPage)
        .skip(propertiesPerPage * (currentPage - 1));

    return {
        propertiesCount,
        properties,
    };
};

export const findPropertyByIdQuery = async (id: ObjectId) => {
    const property: HydratedDocument<IPropertyModel> | null = await Property.findById(id);
    if (!property) {
        throw HttpErrors.NOT_FOUND;
    }
    return property;
};

export const updatePropertyQuery = async (id: ObjectId, data: {}) => {
    const updateProperty: HydratedDocument<IPropertyModel> | null = await Property.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!updateProperty) {
        throw HttpErrors.NOT_FOUND;
    }
    return updateProperty;
};

export const deletePropertyQuery = async (id: ObjectId) => {
    const deletedProperty: HydratedDocument<IPropertyModel> | null = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
        throw HttpErrors.NOT_FOUND;
    }
};
