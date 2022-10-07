import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, ErrorBoundary } from 'pages';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <React.StrictMode>

        <Router basename="/the-awesome-qa-tool">

            <ErrorBoundary>

                <Routes>

                    <Route path="/" element={<Landing />} />

                </Routes>

            </ErrorBoundary>

        </Router>

    </React.StrictMode>

);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
