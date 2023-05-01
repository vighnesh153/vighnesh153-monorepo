import GoogleProvider from 'next-auth/providers/google';
import { serverConfig } from '@/modules/common/config/server-config';

export const NextAuthGoogleProvider = GoogleProvider({
  clientId: serverConfig.oauth.providers.google.clientId,
  clientSecret: serverConfig.oauth.providers.google.clientSecret,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
    },
  },
});
