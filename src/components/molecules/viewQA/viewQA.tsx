import { useState } from 'react';
import { QuestionAnswerType } from 'store/types';
import { ButtonGroup, ButtonIcon } from 'components/molecules';
import './view-qa.scss';

function ViewQA({ className, questionAnswer, onEdit, onDelete }: PropTypes) {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleQuestionClick = () => {

        setIsExpanded(!isExpanded);

    };

    return (

        <div className={`view-qa ${isExpanded ? 'view-qa--expanded' : ''} ${className}`}>

            <button
                className="view-qa__question"
                type="button"
                title="Click to toggle"
                onClick={handleQuestionClick}
            >

                {questionAnswer.question}

            </button>

            <p className="view-qa__answer">{questionAnswer.answer}</p>

            <ButtonGroup className="view-qa__tools" title="tools">

                <ButtonIcon
                    iconName="edit"
                    text="Edit"
                    variation="regular"
                    onClick={() => onEdit(questionAnswer.id)}
                />

                <ButtonIcon
                    iconName="trash"
                    text="Delete"
                    variation="regular"
                    onClick={() => onDelete(questionAnswer.id)}
                />

            </ButtonGroup>

        </div>

    );

}

type PropTypes = {

    className?: string,
    questionAnswer: QuestionAnswerType,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void

}

ViewQA.defaultProps = {
    className: ''
};

export { ViewQA };
