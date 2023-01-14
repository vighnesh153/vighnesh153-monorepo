///
/// Do not import this file in client side code. No security risk, but it will
/// just throw "notFound" error.
///

function envVarNotFound(name: string): string {
  throw new Error(`"${name}" isn't provided in environment variables.`);
}

export const serverConfig = {
  oauth: {
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? envVarNotFound('GOOGLE_CLIENT_ID'),
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? envVarNotFound('GOOGLE_CLIENT_SECRET'),
      },
    },
  },
};
