import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/*  ⬇️ enable Workbox-powered service worker for
    offline caching and instant repeat visits  */
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*  register() = production-only.
    In development the service worker is disabled automatically.  */
serviceWorkerRegistration.register();
