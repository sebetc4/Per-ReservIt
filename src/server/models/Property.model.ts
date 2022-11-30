import mongoose, { Schema, model, models } from 'mongoose';
import { IPropertyModel } from '../../types/models.types';

const PropertySchema = new Schema<IPropertyModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
        },
        type: {
            type: String,
            required: true,
            enum: {
                values: ['hotel', 'hostel', 'guest house', 'apartement'],
            },
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 500,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        postcode : {
            type: String,
            required: true,
        },
        accommodation: [
            {
                quantity: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                pricePerNight: {
                    type: Number,
                    required: true,
                    max: 9999,
                    default: 0.0,
                },
                guestNumb: {
                    type: Number,
                    required: true,
                },
                largeDoubleBed: {
                    type: Number,
                    default: 0,
                },
                doubleBed: {
                    type: Number,
                    default: 0,
                },
                simpleBed: {
                    type: Number,
                    default: 0,
                },
                sofaBed: {
                    type: Number,
                    default: 0,
                },
                airConditionned: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        internet: {
            type: Boolean,
            default: false,
        },
        breakfast: {
            type: Boolean,
            default: false,
        },
        petsAllowed: {
            type: Boolean,
            default: false,
        },
        roomCleaning: {
            type: Boolean,
            default: false,
        },
        ratings: {
            type: Number,
            default: 0,
        },
        numbOfReview: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    required: false,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Property = models.Property || model<IPropertyModel>('Property', PropertySchema);
