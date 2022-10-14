import React from 'react';
import './text-input.scss';

const TextInput = function ({ className, label, value, errorMessage, variant, onChange }: PropTypes) {

    const id = label.toLocaleLowerCase().replace(' ', '_');

    return (

        <div
            className={
                `text-input${variant === 'multi-line' ? '--multi-line' : ''} 
                ${errorMessage !== '' ? 'text-input--error' : ''}
                ${className}`
            }
            title={label}
        >

            {
                variant === 'multi-line' ?

                    (
                        <textarea
                            className="text-input__input"
                            id={id}
                            placeholder={label}
                            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                            value={value}
                        />
                    )

                    :

                    (
                        <input
                            className="text-input__input"
                            id={id}
                            type="text"
                            placeholder={label}
                            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                            value={value}
                        />
                    )
            }

            <label className="text-input__label" htmlFor={id}>{label}</label>

            <span className="text-input__error-message">{errorMessage}</span>

        </div>

    );

};

type PropTypes = {
    className?: string,
    label: string,
    variant?: 'single-line' | 'multi-line',
    value?: string,
    errorMessage?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined
}

TextInput.defaultProps = {

    className: '',
    value: '',
    variant: 'single-line',
    errorMessage: '',
    onChange: undefined

};

export { TextInput };
