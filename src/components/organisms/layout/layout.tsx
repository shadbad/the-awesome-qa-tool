import { useEffect, useState, useCallback } from 'react';
import { useAppStore, useQuestionAnswerStore } from 'store/hooks';
import { SortOrderType } from 'store/types';
import { ButtonMenu } from 'components/atoms';
import { LinkIcon, ButtonIcon, SelectBox } from 'components/molecules';
import { Modal } from 'components/organisms';
import 'assets/styles/globals.scss';
import './layout.scss';

function Layout({ animate, animationDelay, children }: PropTypes) {

    const appServices = useAppStore();

    const qaServices = useQuestionAnswerStore();

    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {

        if (animate) setTimeout(() => setStartAnimation(true), animationDelay);

    }, [animate, animationDelay]);

    const socialLinks: { [media: string]: string } = {

        linkedin: 'https://www.linkedin.com/in/sina-shadbad/',
        twitter: 'https://twitter.com/SinaShadbad',
        github: 'https://github.com/shadbad'

    };

    const sortOptions: { key: SortOrderType, title: string }[] = [
        { key: 'question', title: 'Alphabetically, A-Z' },
        { key: 'question desc', title: 'Alphabetically, Z-A' },
        { key: 'date', title: 'Date, old to new' },
        { key: 'date desc', title: 'Date, new to old' }
    ];

    const handleMenuButtonClick = useCallback(() => {

        appServices.toggleMenu();
        appServices.setModal('none', null);

    }, []);

    const handleCreateNewClick = () => {

        appServices.toggleMenu();
        appServices.setModal('add', null);

    };

    const handleDeleteAllClick = () => {

        appServices.toggleMenu();
        appServices.setModal('purge', null);

    };

    const handleSortOrderClick = (sortOrder: string) => {

        appServices.toggleMenu();
        qaServices.sort(sortOrder as SortOrderType);

    };

    return (
        <>

            <header className={`layout__header ${startAnimation ? 'animate' : ''}`}>

                <div className="layout__header__wrapper">

                    <ButtonMenu
                        className="layout__header__wrapper__menu-button"
                        isCrossed={appServices.isMenuExpanded}
                        onClick={handleMenuButtonClick}
                    />

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

            <aside className={`layout__aside ${appServices.isMenuExpanded ? 'layout__aside--expanded' : ''}`}>

                <p className="layout__aside__info">
                    Here you can find
                    {` ${qaServices.items.length === 0 ? 'no ' : qaServices.items.length} `}
                    question
                    {`${qaServices.items.length === 1 ? '' : 's'}`}
                    . Feel free to create your own questions.
                </p>

                <div className="layout__aside__tools">

                    <ButtonIcon
                        iconName="plus"
                        text="Create new question"
                        variant="regular"
                        onClick={handleCreateNewClick}
                    />

                    <ButtonIcon
                        iconName="trash"
                        text="Delete all"
                        variant="regular"
                        onClick={handleDeleteAllClick}
                    />

                    <SelectBox
                        title="Sort by"
                        options={sortOptions}
                        selectedOption={qaServices.sortOrder}
                        onSelect={handleSortOrderClick}
                    />

                </div>

            </aside>

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
