import './globals.css';
import '@vighnesh153/react-ui/sideEffects';

import { AppTheme, bodyBgColor } from '@/lib/AppTheme';

export const metadata = {
  title: 'Tv Remote via ADB',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: bodyBgColor }}>
        <AppTheme>{children}</AppTheme>
      </body>
    </html>
  );
}
