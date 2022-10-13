import { useLayoutEffect, useState } from 'react';
import { useAppStore } from 'store/hooks';
import { LinkIcon } from 'components/molecules';
import { Modal } from 'components/organisms';
import 'assets/styles/globals.scss';
import './layout.scss';

function Layout({ animate, animationDelay, children }: PropTypes) {

    const appServices = useAppStore();

    const [startAnimation, setStartAnimation] = useState(false);

    useLayoutEffect(() => {

        if (animate) setTimeout(() => setStartAnimation(true), animationDelay);

    }, [animate, animationDelay]);

    const socialLinks: { [media: string]: string } = {

        linkedin: 'https://www.linkedin.com/in/sina-shadbad/',
        twitter: 'https://twitter.com/SinaShadbad',
        github: 'https://github.com/shadbad'

    };

    return (
        <>

            <header className={`layout__header ${startAnimation ? 'animate' : ''}`}>

                <div className="layout__header__wrapper">

                    <span className="layout__header__wrapper__app-name">The Awesome Q/A Tool</span>

                </div>

            </header>

            <main className={`layout__body ${appServices.modal !== 'none' ? 'layout__body--inactive' : ''}`}>

                <div className="layout__body__wrapper">

                    {children}

                </div>

            </main>

            <footer className={`layout__footer ${startAnimation ? 'animate' : ''}`}>

                <div className="layout__footer__wrapper">

                    <small className="layout__footer__wrapper__credit">Developed by Sina Shadbad</small>

                    <ul className="layout__footer__wrapper__social-media">

                        {
                            Object.entries(socialLinks).map(([key, value]) => (

                                <li key={value} className="layout__footer__wrapper__social-media__item">

                                    <LinkIcon
                                        className="layout__footer__wrapper__social-media__item__link"
                                        href={value}
                                        iconName={key}
                                    />

                                </li>

                            ))
                        }

                    </ul>

                </div>

            </footer>

            <Modal />
        </>

    );

}

type PropTypes = {

    children: React.ReactNode,
    animate?: boolean,
    animationDelay?: number

}

Layout.defaultProps = {

    animate: false,
    animationDelay: 0

};

export { Layout };
