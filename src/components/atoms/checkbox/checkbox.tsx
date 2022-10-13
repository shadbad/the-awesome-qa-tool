import { Icon } from 'components/atoms';
import './checkbox.scss';

function Checkbox({ className, label, checked, value, onChange }: PropTypes) {

    const id = label.toLocaleLowerCase().replace(' ', '_');

    return (
        <div className={`checkbox ${className}`} title={label}>

            <Icon className="checkbox__icon" name={checked ? 'check-square' : 'square'} />

            <input
                className="checkbox__input"
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                value={value}
            />

            <label className="checkbox__label" htmlFor={id}>{label}</label>

        </div>
    );

}

type PropTypes = {
    className?: string,
    checked?: boolean,
    label: string,
    value: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

Checkbox.defaultProps = {
    className: '',
    checked: false,
    onChange: undefined
};

export { Checkbox };
