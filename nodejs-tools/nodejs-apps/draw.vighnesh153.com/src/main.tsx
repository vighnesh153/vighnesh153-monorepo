import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, AppProviders } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
