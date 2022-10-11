import React from 'react';
import './text-input.scss';

const TextInput = function ({ className, label, value, variation, onChange }: PropTypes) {

    const id = label.toLocaleLowerCase().replace(' ', '_');

    return (

        <div className={`text-input${variation === 'multi-line' ? '--multi-line' : ''} ${className}`} title={label}>

            {
                variation === 'multi-line' ?

                    (
                        <textarea
                            className="text-input__input"
                            id={id}
                            placeholder={label}
                            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                        >

                            {value}

                        </textarea>
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

        </div>

    );

};

type PropTypes = {
    className?: string,
    label: string,
    variation?: 'single-line' | 'multi-line',
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined
}

TextInput.defaultProps = {

    className: '',
    value: '',
    variation: 'single-line',
    onChange: undefined

};

export { TextInput };
