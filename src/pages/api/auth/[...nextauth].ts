import CredentialsProvider from 'next-auth/providers/credentials';
import nextAuth, { Session } from 'next-auth';
import { signInSchema } from '../../../utils/validationSchemas';
import { HttpErrors } from '../../../types/api.types';
import dbConnect from '../../../server/config/db.config';
import { findUserByEmail } from '../../../server/queries/user.queries';
import { User } from 'next-auth';
import { UserInstance } from '../../../types/user.types';

declare module 'next-auth' {
    interface Session {
        user: {
            _id: string | undefined;
        };
    }
}

type Credentials = {
    email: string;
    password: string;
}

const validCredentials = async (credentials: Credentials) => {
    const { email, password } = credentials;
    if (!(await signInSchema.isValid({ email, password }))) {
        throw new Error(HttpErrors.BAD_REQUEST.message);
    }
    return credentials;
};

export default nextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                await dbConnect();
                const { email, password } = await validCredentials(credentials as Credentials);
                const user: UserInstance = await findUserByEmail(email);
                if (!(await user.isValidPassword(password))) {
                    throw new Error(HttpErrors.WRONG_PASSWORD.message);
                }
                return user as User;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            return token;
        },
        
        session: async ({ session, token }) => {
            session.user._id = token.sub;
            return session;
        },
    },
});
