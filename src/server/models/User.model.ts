import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema, UserSession } from '../../types/user.types';
import { CustomError } from '../../types/api.types';
import crypto from 'crypto'

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
            public_id: {
                type: String,
                default: null,
            },
            url: {
                type: String,
                default: null,
            },
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
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

UserSchema.methods.getSession = function (): UserSession {
    return {
        _id: this._id,
        authProvider: this.authProvider,
        username: this.username,
        email: this.email,
        avatar: this.avatar,
    };
};

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

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    this.save({validateBeforeSave: false})
    return resetToken
}

export const User = models.User || model<UserSchema>('User', UserSchema);
