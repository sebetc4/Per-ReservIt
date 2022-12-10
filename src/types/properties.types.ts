import { Document, HydratedDocument, ObjectId, SchemaTimestampsConfig } from 'mongoose';

interface ILocation {
    address: string;
    city: string;
    postcode: string;
}

export interface IImageProperty {
    public_id: string;
    url: string;
}

export type KeysOfAccomodationOptions = keyof IAccommodationOptions;

interface IAccommodationOptions {
    airConditionned?: boolean;
    minibar?: boolean;
}

export interface IAccommodation {
    quantity: number;
    name: string;
    guests: number;
    price: number;
    beds: IBeds;
    options: IAccommodationOptions;
}

export type KeysOfBeds = keyof IBeds;

interface IBeds {
    largeDoubleBed?: number;
    doubleBed?: number;
    simpleBed?: number;
    sofaBed?: number;
}

export type KeysOfFacilities = keyof IFacilities;

interface IFacilities {
    carPark: boolean;
    internet: boolean;
    breakfast: boolean;
    petsAllowed: boolean;
    roomCleaning: boolean;
}

interface IReviewProperty {
    user: ObjectId;
    name: string;
    rating: number;
    comment: string;
}

export type KeysOfPropertyCategory = PropertyType['category'] | 'all';

export interface IPropertySchema extends Document {
    name: string;
    category: 'hotel' | 'hostel' | 'guest house' | 'house' | 'apartement';
    description: string;
    location: ILocation;
    accommodations: IAccommodation[];
    facilities: IFacilities;
    rating: number;
    numbOfReview: number;
    reviews: IReviewProperty[];
    images: IImageProperty[];
    user: ObjectId;
}

export type PropertyType = HydratedDocument<IPropertySchema> & SchemaTimestampsConfig;

export type PropertyPreview = Pick<
    PropertyType,
    '_id' | 'name' | 'category' | 'description' | 'location' | 'rating' | 'images' | 'numbOfReview'
> & { minPrice: number };
