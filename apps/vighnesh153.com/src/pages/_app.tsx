import '../styles/globals.css';
import '@vighnesh153/ui/src/imports';

import { VighneshThemeProvider } from '@vighnesh153/ui';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { alpha, Box } from '@mui/material';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <VighneshThemeProvider>
        <Box
          sx={{
            '& ::selection': {
              backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.9),
              color: (theme) => theme.palette.secondary.main,
            },
          }}
        >
          <Component {...pageProps} />
        </Box>
      </VighneshThemeProvider>
    </SessionProvider>
  );
}
