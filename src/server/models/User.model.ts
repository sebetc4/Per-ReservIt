import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserSchema, UserType } from '../../types/user.types';
import { HttpErrors } from '../../types/api.types';

const UserSchema = new Schema<IUserSchema>(
    {
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
            required: true,
        },
        avatar: String,
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('validate', async function () {
    const user = await User.findOne({ email: this.email });
    if (user) {
        throw HttpErrors.EMAIL_ALREADY_EXISTS;
    }
});

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

UserSchema.methods.isValidPassword = async function (password: UserType['password']) {
    return await bcrypt.compare(password, this.password)
}

export const User = models.User || model<IUserSchema>('User', UserSchema);
