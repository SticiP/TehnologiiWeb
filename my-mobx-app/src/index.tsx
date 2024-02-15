import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "mobx-react";
import person from './Person';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider person={ person }>
      <App />
    </Provider>
  </React.StrictMode>
);
