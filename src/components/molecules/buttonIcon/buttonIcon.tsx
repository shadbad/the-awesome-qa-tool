import { Icon } from 'components/atoms';
import './button-icon.scss';

function ButtonIcon({ className, text, iconName, variant, onClick }: PropTypes) {
    return (
        <button
            type="button"
            className={`button-icon ${variant === 'tooltip' ? 'button-icon--tooltip' : ''} ${className}`}
            onClick={onClick}
            title={text}
        >
            <Icon className="button-icon__icon" name={iconName} />
            {variant !== 'tooltip' && <span className="button-icon__text">{text}</span>}
        </button>
    );
}

type PropTypes = {
    className?: string;
    text: string;
    iconName: string;
    variant?: 'tooltip' | 'regular';
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

ButtonIcon.defaultProps = {
    className: '',
    onClick: undefined,
    variant: 'regular'
};

export { ButtonIcon };
