import { Date, HydratedDocument, ObjectId, SchemaTimestampsConfig } from "mongoose";

/**
/ Models
*/
export type ImageType = {
    public_id: string;
    url: string;
}

export type WithId<T> = T & {
    _id: ObjectId;
}

export type WithIdAndTimestamps<T> = WithId<T> & {
    createdAt: string;
    updatedAt: string;
}

export type InstanceOf<T> = Omit<HydratedDocument<T>, '_id'> & {
    _id: ObjectId
}

export type InstanceOfWithDates<T> = InstanceOf<T> & SchemaTimestampsConfig

/**
/ Error Messages
*/
