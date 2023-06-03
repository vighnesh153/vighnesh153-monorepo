import { useEffect } from 'react';
import { theme } from '@vighnesh153/react-ui';
import { HomePage } from './HomePage';

export function App() {
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.primary.dark;
  }, []);
  return <HomePage />;
}
