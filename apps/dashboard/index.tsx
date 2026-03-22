import React from 'react';
import ReactDOM from 'react-dom/client';
import { DashboardPage } from './DashboardPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <DashboardPage />
  </React.StrictMode>
);
