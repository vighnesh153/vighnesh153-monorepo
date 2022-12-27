import '../styles/globals.css';
import type { AppProps } from 'next/app';

import '@vighnesh153/ui/src/imports';
import { VighneshThemeProvider } from '@vighnesh153/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VighneshThemeProvider>
      <Component {...pageProps} />
    </VighneshThemeProvider>
  );
}
