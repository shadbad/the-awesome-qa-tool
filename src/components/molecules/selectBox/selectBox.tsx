import { useState } from 'react';
import { Icon } from 'components/atoms';
import { SortOrderType } from 'store/types';
import './select-box.scss';

function SelectBox({ className, title, options, selectedOption, onSelect }: PropTypes) {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleSwitchClick = () => {

        setIsExpanded(!isExpanded);

    };

    const handleOptionClick = (option: string) => {

        onSelect(option);

        setIsExpanded(false);

    };

    return (

        <div className={`select-box ${isExpanded ? 'select-box--expanded' : ''} ${className}`}>

            <button className="select-box__switch" type="button" onClick={handleSwitchClick}>

                <Icon className="select-box__switch__icon" name="sort" />

                <span className="select-box__switch__title">{title}</span>

                <Icon className="select-box__switch__chevron" name={isExpanded ? 'chevron-up' : 'chevron-down'} />

            </button>

            <ul className="select-box__list">
                {
                    options.map((item) => (

                        <li className="select-box__list__item" key={item.key}>

                            <button
                                className={`select-box__list__item__button ${selectedOption === item.key ? 'mark' : ''}`}
                                type="button"
                                onClick={() => handleOptionClick(item.key)}
                            >
                                {item.title}
                            </button>

                        </li>
                    ))
                }
            </ul>

        </div>

    );

}

type PropTypes = {
    className?: string,
    title: string,
    options: { key: SortOrderType, title: string }[],
    selectedOption: string,
    onSelect: (option: string) => void
};

SelectBox.defaultProps = {
    className: ''
};

export { SelectBox };
