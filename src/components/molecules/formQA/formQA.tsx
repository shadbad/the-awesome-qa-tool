import React, { useReducer, useState } from 'react';
import { TextInput, Tooltip, Checkbox } from 'components/atoms';
import { ButtonIcon } from 'components/molecules';
import { QuestionAnswerType } from 'store/types';
import { generateId } from 'utilities';
import './form-qa.scss';

function FormQA({ className, variant, questionAnswer, onSubmit, onCancel }: PropTypes) {

    const title = variant === 'create' ? 'Create a new question' : 'Update the selected question';

    const tooltip = variant === 'create' ?
        'Here you can create new questions and their answers.'
        :
        'Here you can update the selected question and its answer.';

    const [deffer, setDeffer] = useState(false);

    const [state, dispatch] = useReducer(

        (_state: QuestionAnswerType, action: Action<string>) => {

            switch (action.type) {

                case 'setQuestion':
                    return { ..._state, question: action.payload };

                case 'setAnswer':
                    return { ..._state, answer: action.payload };

                default:
                    throw new Error('unknown command');

            }

        },

        questionAnswer || {
            id: generateId(),
            question: '',
            answer: '',
            date: new Date().valueOf()
        }

    );

    const handleQuestionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

        dispatch({
            type: 'setQuestion',
            payload: target.value
        });

    };

    const handleAnswerChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {

        dispatch({
            type: 'setAnswer',
            payload: target.value
        });

    };

    const handleSubmit = () => {

        if (onSubmit) {

            setTimeout(() => {

                onSubmit(state);

            }, deffer ? 5000 : 0);

        }

    };

    return (

        <form className={`form-qa ${className}`}>

            <Tooltip tip={tooltip}>

                <h2 className="form-qa__heading">{title}</h2>

            </Tooltip>

            <TextInput
                label="Question"
                className="form-qa__question-input"
                variant="single-line"
                value={state.question}
                onChange={handleQuestionChange}
            />

            <TextInput
                label="Answer"
                className="form-qa__answer-input"
                variant="multi-line"
                value={state.answer}
                onChange={handleAnswerChange}
            />

            <Checkbox
                className="form-qa__delay-checkbox"
                label="Deferred Save"
                value="false"
                checked={deffer}
                onChange={() => setDeffer(!deffer)}
            />

            <div className="form-qa__button-wrapper">

                <ButtonIcon
                    className="form-qa__button-wrapper__submit"
                    iconName="check"
                    text={variant === 'create' ? 'Create Question' : 'Update Question'}
                    onClick={handleSubmit}
                />

                <ButtonIcon
                    className="form-qa__button-wrapper__cancel"
                    iconName="cross"
                    text="Cancel"
                    onClick={onCancel}
                />

            </div>

        </form>

    );

}

type PropTypes = {

    className?: string,
    variant?: 'create' | 'update',
    questionAnswer?: QuestionAnswerType | null,
    onSubmit: (questionAnswer: QuestionAnswerType) => void,
    onCancel: () => void

};

FormQA.defaultProps = {

    className: '',
    variant: 'create',
    questionAnswer: {
        id: generateId(),
        question: '',
        answer: '',
        date: new Date().valueOf()
    }

};

type Action<T> = {
    type: string,
    payload: T
}

export { FormQA };
