import { Component, ErrorInfo, ReactNode } from 'react';
import { Layout } from 'components/organisms';
import './error-boundary.scss';

type ErrorBoundaryPropsType = {
    children?: ReactNode;
}

type State = {
    hasError: boolean,
    error: string,
    info: string
}

class ErrorBoundary extends Component<ErrorBoundaryPropsType, State> {

    // eslint-disable-next-line react/static-property-placement
    static defaultProps: ErrorBoundaryPropsType = {

        children: null

    };

    constructor(props: ErrorBoundaryPropsType) {

        super(props);

        this.state = {
            hasError: false,
            error: '',
            info: ''
        };

    }

    public static getDerivedStateFromError(error: Error): State {

        return { hasError: true, error: error.message, info: '' };

    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {

        this.setState({ hasError: true, error: error.message, info: errorInfo.componentStack });

    }

    public render() {

        const { hasError, error, info } = this.state;
        const { children } = this.props;

        if (hasError) {

            return (

                <Layout>

                    <h1 className="error-boundary__heading">Sorry.. there was an error</h1>

                    <h2 className="error-boundary__title">{error}</h2>

                    <ul className="error-boundary__trace">

                        {
                            info.split(' at ').map((item) => item.trim().length > 0 && (

                                <li key={item} className="error-boundary__trace__item">

                                    {`at ${item}`}

                                </li>

                            ))
                        }

                    </ul>

                </Layout>

            );

        }

        return children;

    }

}

export { ErrorBoundary };
