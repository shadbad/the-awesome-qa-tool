import React, { useReducer } from 'react';
import { TextInput, Tooltip } from 'components/atoms';
import { ButtonIcon } from 'components/molecules';
import { QuestionAnswerType } from 'store/types';
import { generateId } from 'utilities';
import './form-question-answer.scss';

function FormQuestionAnswer({ className, variation, questionAnswer, onSubmit, onCancel }: PropTypes) {

    if (!questionAnswer) throw new Error('State initialization error.');

    const title = variation === 'create' ? 'Create a new question' : 'Update the selected question';

    const tooltip = variation === 'create' ?
        'Here you can create new questions and their answers.'
        :
        'Here you can update the selected question and its answer.';

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

        questionAnswer

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

        if (onSubmit) onSubmit(state);

    };

    return (

        <form className={`form-question-answer ${className}`}>

            <Tooltip tip={tooltip}>

                <h2 className="form-question-answer__heading">{title}</h2>

            </Tooltip>

            <TextInput
                label="Question"
                className="form-question-answer__question-input"
                variation="single-line"
                value={state.question}
                onChange={handleQuestionChange}
            />

            <TextInput
                label="Answer"
                className="form-question-answer__answer-input"
                variation="multi-line"
                value={state.answer}
                onChange={handleAnswerChange}
            />

            <div className="form-question-answer__buttons-wrapper">

                <ButtonIcon iconName="check" text="Create Question" onClick={handleSubmit} />

                <ButtonIcon iconName="cross" text="Cancel" onClick={onCancel} />

            </div>

        </form>

    );

}

type PropTypes = {

    className?: string,
    variation?: 'create' | 'update',
    questionAnswer?: QuestionAnswerType,
    onSubmit?: (questionAnswer: QuestionAnswerType) => void | undefined,
    onCancel?: () => void | undefined

};

FormQuestionAnswer.defaultProps = {

    className: '',
    variation: 'create',
    questionAnswer: {
        id: generateId(),
        question: '',
        answer: '',
        date: new Date().valueOf()
    },
    onSubmit: undefined,
    onCancel: undefined

};

type Action<T> = {
    type: string,
    payload: T
}

export { FormQuestionAnswer };
