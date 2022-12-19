import CredentialssProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import nextAuth from 'next-auth';

import dbConnect from '../../../server/config/db.config';
import { UserSession } from '../../../types/user.types';
import { Credentials } from '../../../types/request.types';
import { handleGoogleProvider } from '../../../server/providers/google.provider';
import { handleCredentialsProvider } from '../../../server/providers/credentials.provider';
import { User } from '../../../server/models/User.model';
import { SessionStatus } from '../../../types/api.types';

declare module 'next-auth' {
    interface Session {
        expires: 'string';
        status: SessionStatus
        user: UserSession | null;
    }
}

export default nextAuth({
    providers: [
        CredentialssProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                return handleCredentialsProvider(credentials as Credentials);
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        signIn: async ({ account, profile }) => {
            if (!account) {
                return false;
            }
            switch (account.provider) {
                case 'credentials':
                    return true;
                    break;
                case 'google':
                    return await handleGoogleProvider(profile, account);
                    break;
                default:
                    return false;
            }
        },

        jwt: async ({ token, account }) => {
            if (account?.userId) {
                token.sub = account.userId;
            }
            return token;
        },

        session: async ({ session, token }) => {
            dbConnect();
            const user = await User.findById(token.sub);
            if (!user) {
                session.user = null
                session.status = SessionStatus.INVALID;
                
            } else {
                session.status = SessionStatus.VALID;
                session.user = user.getSession()
            }
            return session;
        },
    },
});
