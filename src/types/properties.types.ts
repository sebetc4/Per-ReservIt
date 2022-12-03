import { Document, HydratedDocument, ObjectId, SchemaTimestampsConfig } from 'mongoose';

type ModelType<IShema> = HydratedDocument<IShema> & SchemaTimestampsConfig;

interface IImageProperty {
    public_id: string;
    url: string;
}

interface IAccommodation {
    quantity: number;
    name: string;
    guestNumb: number;
    pricePerNight: number;
    largeDoubleBed?: number;
    doubleBed?: number;
    simpleBed?: number;
    sofaBed?: number;
    airConditionned?: boolean;
}

interface IReviewProperty {
    user: ObjectId;
    name: string;
    rating: number;
    comment: string;
}

export interface IPropertySchema extends Document {
    name: string;
    type: 'hotel' | 'hostel' | 'guest house' | 'house' | 'apartement';
    description: string;
    address: string;
    city: string;
    postcode: string;
    accommodation: IAccommodation[];
    internet?: boolean;
    breakfast?: boolean;
    petsAllowed?: boolean;
    roomCleaning?: boolean;
    rating?: number;
    numbOfReview?: number;
    reviews: IReviewProperty[];
    images: IImageProperty[];
    user: ObjectId;
}

export type PropertyType = ModelType<IPropertySchema>;

export type PropertyPreview = Pick<
    PropertyType,
    '_id' | 'name' | 'type' | 'description' | 'city' | 'rating' | 'images'
>;
