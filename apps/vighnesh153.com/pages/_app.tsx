import '../styles/globals.css';
import '@vighnesh153/ui/src/imports';

import { VighneshThemeProvider } from '@vighnesh153/ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VighneshThemeProvider>
      <Component {...pageProps} />
    </VighneshThemeProvider>
  );
}
