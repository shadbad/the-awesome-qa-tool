import React from 'react';
import ReactDOM from 'react-dom/client';
import { Landing, ErrorBoundary } from 'pages';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <React.StrictMode>

        <ErrorBoundary>

            <Landing />

        </ErrorBoundary>

    </React.StrictMode>

);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
