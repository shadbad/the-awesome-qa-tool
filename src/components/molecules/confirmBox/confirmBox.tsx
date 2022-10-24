import { ButtonIcon } from 'components/molecules';
import './confirm-box.scss';

function ConfirmBox({ className, message, onConfirm, onCancel }: PropTypes) {
    return (
        <div className={`confirm-box ${className}`}>
            <p className="confirm-box__message">{message}</p>

            <div className="confirm-box__button-wrapper">
                <ButtonIcon iconName="check" variant="regular" text="Ok" onClick={() => onConfirm()} />

                <ButtonIcon iconName="cross" variant="regular" text="Cancel" onClick={() => onCancel()} />
            </div>
        </div>
    );
}

type PropTypes = {
    className?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

ConfirmBox.defaultProps = {
    className: ''
};

export { ConfirmBox };
