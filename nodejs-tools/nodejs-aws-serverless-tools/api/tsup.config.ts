import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    googleAuthCallback: './src/googleAuthCallback/index.ts',
    initiateGoogleLogin: './src/initiateGoogleLogin/index.ts',
    initiateLogout: './src/initiateLogout/index.ts',
    getUser: './src/getUser/index.ts',
  },
  splitting: false,
  external: ['@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb', '@types/aws-lambda', '@aws-sdk/types'],
  clean: true,
  minify: true,
  treeshake: true,
  format: 'esm',
}));
