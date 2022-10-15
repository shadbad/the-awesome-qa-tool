import { Provider } from 'react-redux';
import { store, initializeStore } from 'store';
import { Landing, ErrorBoundary } from 'pages';

function App() {

    initializeStore();

    return (

        <ErrorBoundary>

            <Provider store={store}>

                <Landing />

            </Provider>

        </ErrorBoundary>

    );

}

export { App };
