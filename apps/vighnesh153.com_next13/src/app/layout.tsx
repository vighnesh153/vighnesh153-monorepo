import './globals.css';
import '@vighnesh153/ui/sideEffects';

import { Analytics } from '@vercel/analytics/react';
import { bodyBgColor } from '@/ui-modules/common/utils';

import { AppTheme } from '@/ui-modules/common/components/theme';
import { AuthProvider } from '@/ui-modules/common/components/AuthProvider';

// TODO: Check if this works
// export { reportWebVitals } from 'next-axiom';

export const metadata = {
  title: 'Vighnesh Raut - the man, the myth, the living legend himself',
  description:
    'Vighnesh is a Software Engineer who specializes in building exceptional ' +
    'web interfaces. He also loves to dabble with Physics and Mathematics. ' +
    'When bored, you can find him watching Netflix on his bed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body style={{ backgroundColor: bodyBgColor }}>
          <AppTheme>
            <Analytics />
            {children}
          </AppTheme>
        </body>
      </html>
    </AuthProvider>
  );
}
