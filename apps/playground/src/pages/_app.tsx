import '../styles/globals.css';
import '@vighnesh153/ui/sideEffects';

import { VighneshThemeProvider } from '@vighnesh153/ui';
import type { AppProps } from 'next/app';
import { alpha, Box } from '@mui/material';

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
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
  );
}
