export type ImageType = {
    public_id: string;
    url: string;
}

export type WithId<T> = T & {
    _id: string;
}

export type WithIdAndTimestamps<T> = WithId<T> & {
    createdAt: string;
    updatedAt: string;
}