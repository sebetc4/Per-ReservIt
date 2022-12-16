import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema } from '../../types/user.types';
import { CustomError } from '../../types/api.types';
import { boolean } from 'yup';

const UserSchema = new Schema<UserSchema>(
    {
        authProvider: {
            type: String,
            required: true,
            enum: ['credentials', 'google'],
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        avatar: {
            type: {
                public_id: {
                    type: String,
                    default: null
                },
                url: {
                    type: String,
                    default: null
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('validate', async function () {
    if (!this.email || this.isModified('email')) {
        const user = await User.findOne({ email: this.email });
        if (user) {
            throw CustomError.EMAIL_ALREADY_EXISTS;
        }
    }
});

UserSchema.pre('save', async function () {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

UserSchema.methods.isValidPassword = async function (password: UserSchema['password']) {
    return await bcrypt.compare(password!, this.password);
};

UserSchema.methods.isEqualValues = function (values: Partial<UserSchema>) {
    for (let key in values) {
        if (values[key as keyof UserSchema] === this[key]) {
            return false;
        }
    }
    return true;
};

export const User = models.User || model<UserSchema>('User', UserSchema);
