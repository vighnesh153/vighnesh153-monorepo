import NextAuth, { AuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { nextAuthMongoDbClientPromise } from '@lib/mongodb-next-auth';
import { NextAuthGoogleProvider, nextAuthSignInCallback } from '@lib/helpers/next-auth/server';

// const useSecureCookies = Boolean(process.env.VERCEL_URL);

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(nextAuthMongoDbClientPromise),
  callbacks: {
    signIn: nextAuthSignInCallback,
  },
  providers: [NextAuthGoogleProvider],
};

export default NextAuth(authOptions);
