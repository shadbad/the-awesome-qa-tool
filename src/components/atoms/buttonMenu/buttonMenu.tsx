import React from 'react';
import './button-menu.scss';

const ButtonMenuComponent = function ({ className, isCrossed, onClick }: PropTypes) {

    return (

        <button
            type="button"
            className={`icon-menu ${isCrossed ? 'crossed' : ''} ${className}`}
            onClick={onClick}
        >

            <i />
            <i />
            <i />

        </button>

    );

};

type PropTypes = {
    className?: string,
    isCrossed: boolean,
    onClick?: () => void
};

ButtonMenuComponent.defaultProps = {

    className: '',
    onClick: undefined

};

const ButtonMenu = React.memo(ButtonMenuComponent);

export { ButtonMenu };
