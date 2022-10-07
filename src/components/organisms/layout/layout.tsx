import 'assets/styles/globals.scss';
import './layout.scss';

type LayoutPropTypes = {

    children: React.ReactNode

}

function Layout({ children }: LayoutPropTypes) {

    return (
        <>

            <header className="layout__header">

                <div className="layout__header__wrapper">

                    this is the header

                </div>

            </header>

            <main className="layout__body">

                <div className="layout__body__wrapper">

                    {children}

                </div>

            </main>

            <footer className="layout__footer">

                <div className="layout__footer__wrapper">

                    this is the footer

                </div>

            </footer>

        </>

    );

}

export { Layout };
