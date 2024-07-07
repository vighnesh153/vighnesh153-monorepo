import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    googleAuthCallback: './src/googleAuthCallback/index.ts',
    initiateGoogleLogin: './src/initiateGoogleLogin/index.ts',
    initiateGoogleLogout: './src/initiateGoogleLogout/index.ts',
  },
  splitting: false,
  external: ['aws-sdk'],
  clean: true,
  minify: true,
  treeshake: true,
  format: 'esm',
}));
