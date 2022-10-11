import { Icon } from 'components/atoms';
import './button-icon.scss';

function ButtonIcon({ className, text, iconName, onClick }: PropTypes) {

    return (

        <button
            type="button"
            className={`button-icon ${className}`}
            onClick={onClick}
        >

            <Icon className="button-icon__icon" name={iconName} />
            <span className="button-icon__text">{text}</span>

        </button>

    );

}

type PropTypes = {

    className?: string,
    text: string,
    iconName: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined

}

ButtonIcon.defaultProps = {

    className: '',
    onClick: undefined

};

export { ButtonIcon };
