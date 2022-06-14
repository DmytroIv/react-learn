import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/client/App';
import { store } from '@/client/store/store';
import { Provider } from 'react-redux';

import '@/client/index.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
