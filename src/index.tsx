import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, initializeStore } from 'store';
import { Landing, ErrorBoundary } from 'pages';
import reportWebVitals from './reportWebVitals';

initializeStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <React.StrictMode>

        <ErrorBoundary>

            <Provider store={store}>

                <Landing />

            </Provider>

        </ErrorBoundary>

    </React.StrictMode>

);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
