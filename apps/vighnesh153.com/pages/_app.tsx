import type { AppProps } from 'next/app';

import '@vighnesh153/ui/src/imports';

import { VighneshThemeProvider } from '@vighnesh153/ui';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VighneshThemeProvider>
      <Component {...pageProps} />
    </VighneshThemeProvider>
  );
}
