import { Html, Head, Main, NextScript } from 'next/document';
import { theme } from '@vighnesh153/react-ui';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ backgroundColor: theme.palette.primary.main }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
