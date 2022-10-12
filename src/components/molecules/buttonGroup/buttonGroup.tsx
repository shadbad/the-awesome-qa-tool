import { useState } from 'react';
import { ButtonIcon } from 'components/molecules';
import { generateId } from 'utilities';
import './button-group.scss';

function ButtonGroup({ className, title, children }: PropTypes) {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleMoreButtonClick = () => {

        setIsExpanded(!isExpanded);

    };

    return (

        <div className={`button-group${isExpanded ? '--expanded' : ''} ${className}`}>

            <ButtonIcon
                variation="tooltip"
                iconName={isExpanded ? 'cross' : 'more-vertical'}
                className="button-group__switch"
                text={title}
                onClick={handleMoreButtonClick}
            />

            <ul className="button-group__button-list">

                {
                    children.map((item) => (

                        <li
                            className="button-group__button-list__item"
                            key={generateId()}
                        >

                            {item}

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
    children: React.ReactElement<typeof ButtonIcon>[]

}

ButtonGroup.defaultProps = {

    className: ''

};

export { ButtonGroup };
