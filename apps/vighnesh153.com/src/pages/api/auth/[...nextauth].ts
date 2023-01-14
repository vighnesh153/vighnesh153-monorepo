import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { serverConfig } from '@modules/common/config/server-config';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { nextAuthMongoDbClientPromise } from '@lib/mongodb-next-auth';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(nextAuthMongoDbClientPromise),
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const googleProfile = profile as GoogleProfile;
        return googleProfile.email_verified;
      }
      return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: serverConfig.oauth.providers.google.clientId,
      clientSecret: serverConfig.oauth.providers.google.clientSecret,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
