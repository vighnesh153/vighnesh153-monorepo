import NextAuth, { AuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { nextAuthMongoDbClientPromise } from '@lib/mongodb-next-auth';
import { nextAuthSignInCallback, NextAuthGoogleProvider } from '@lib/helpers/next-auth/server';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(nextAuthMongoDbClientPromise),
  callbacks: {
    signIn: nextAuthSignInCallback,
  },
  providers: [NextAuthGoogleProvider],
};

export default NextAuth(authOptions);
