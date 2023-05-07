import './globals.css';
import '@vighnesh153/ui/sideEffects';

import { Analytics } from '@vercel/analytics/react';
import { AppTheme } from '@/ui-modules/common/components';
import { bodyBgColor } from '@/ui-modules/common/utils';

export const metadata = {
  title: 'Vighnesh Raut - the man, the myth, the living legend himself',
  description:
    'Vighnesh is a Software Engineer who specializes in building exceptional ' +
    'web interfaces. He also loves to dabble with Physics and Mathematics. ' +
    'When bored, you can find him watching Netflix on his bed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: bodyBgColor }}>
        <AppTheme>
          {children}
          <Analytics />
        </AppTheme>
      </body>
    </html>
  );
}
