import NextAuth, { AuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { nextAuthMongoDbClientPromise } from '@/lib/mongodb-next-auth';
import { NextAuthGoogleProvider, nextAuthCallback } from '@/lib/helpers/next-auth/server';

// const useSecureCookies = Boolean(process.env.VERCEL_URL);

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(nextAuthMongoDbClientPromise),
  callbacks: {
    signIn: nextAuthCallback,
  },
  providers: [NextAuthGoogleProvider],
};

export default NextAuth(authOptions);
