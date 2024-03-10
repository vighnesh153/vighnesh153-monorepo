import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: {
    googleAuthCallback: './src/googleAuthCallback/index.ts',
    initiateGoogleLogin: './src/initiateGoogleLogin/index.ts',
  },
  splitting: false,
  clean: true,
  minify: true,
  treeshake: true,
  format: 'esm',
}));
