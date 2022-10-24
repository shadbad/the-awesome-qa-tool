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
        <div
            className={`view-qa ${isExpanded ? 'view-qa--expanded' : ''} ${className}`}
            data-testid={`view-qa-${questionAnswer.id}`}
        >
            <button className="view-qa__question" type="button" title="Click to toggle" onClick={handleQuestionClick}>
                {questionAnswer.question}
            </button>

            <p className="view-qa__answer">{questionAnswer.answer}</p>

            <ButtonGroup className="view-qa__tools" title="tools">
                <ButtonIcon
                    iconName="edit"
                    text="Edit"
                    variant="regular"
                    key="edit"
                    onClick={() => onEdit(questionAnswer)}
                />

                <ButtonIcon
                    iconName="trash"
                    text="Delete"
                    variant="regular"
                    key="delete"
                    onClick={() => onDelete(questionAnswer.id)}
                />
            </ButtonGroup>
        </div>
    );
}

type PropTypes = {
    className?: string;
    questionAnswer: QuestionAnswerType;
    onEdit: (item: QuestionAnswerType) => void;
    onDelete: (itemId: string) => void;
};

ViewQA.defaultProps = {
    className: ''
};

export { ViewQA };
