import CredentialsProvider from 'next-auth/providers/credentials';
import nextAuth, { Session } from 'next-auth';
import { signInSchema } from '../../../utils/validationSchemas';
import { HttpErrors } from '../../../types/api.types';
import { User } from '../../../server/models/User.model';
import dbConnect from '../../../server/config/db.config';
import { UserType } from '../../../types/user.types';

declare module 'next-auth' {
    interface Session {
        user: {
            _id: string | undefined;
        };
    }
}

const validCredentials = async (credentials: any) => {
    const { email, password } = credentials;
    if (!(await signInSchema.isValid({ email, password }))) {
        throw new Error(HttpErrors.BAD_REQUEST.message);
    }
    return credentials;
};

const findUser = async (email: UserType['email']) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(HttpErrors.WRONG_EMAIL.message);
    }
    return user;
};

export default nextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: unknown, req) {
                await dbConnect();
                const { email, password } = await validCredentials(credentials);
                const user = await findUser(email);
                if (!(await user.isValidPassword(password))) {
                    throw new Error(HttpErrors.WRONG_PASSWORD.message);
                }
                return user;
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            session.user._id = token.sub;
            return session;
        },
    },
});
