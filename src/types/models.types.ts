import { Document, ObjectId } from 'mongoose';

interface IImageProperty {
    public_id: true;
    url: true;
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

export type AccommodationKeys = keyof IAccommodation

interface IReviewProperty {
    user: ObjectId;
    name: string;
    rating: number;
    comment: string;
}

export interface IPropertyModel extends Document {
    name: string;
    type: 'hotel' | 'hostel' | 'guest house' | 'apartement';
    description: string;
    address: string;
    city: string;
    postcode: string
    accommodation: IAccommodation[];
    internet?: boolean;
    breakfast?: boolean;
    petsAllowed?: boolean;
    roomCleaning?: boolean;
    ratings?: number;
    numbOfReview?: number;
    reviews: IReviewProperty[];
    images: IImageProperty[];
    user: ObjectId;
}
