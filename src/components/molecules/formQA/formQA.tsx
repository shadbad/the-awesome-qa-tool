/* eslint-disable no-param-reassign */
import React, { useReducer, useEffect } from 'react';
import { produce } from 'immer';
import { TextInput, Tooltip, Checkbox } from 'components/atoms';
import { ButtonIcon } from 'components/molecules';
import { QuestionAnswerType } from 'store/types';
import { generateId } from 'utilities';
import './form-qa.scss';

function getInitialState(questionAnswer: QuestionAnswerType | null | undefined) {

    return {

        questionAnswer: questionAnswer || {
            id: generateId(),
            question: '',
            answer: '',
            date: new Date().valueOf()
        },

        validationSummary: {
            questionError: '',
            answerError: ''
        },

        defferSave: false,

        startCountDown: false,

        counter: 5
    };

}

function reducer(state: StateType, action: ActionType) {

    switch (action.type) {

        case 'setQuestion':
            return produce(state, (draft) => {

                draft.questionAnswer.question = action.payload as string;

            });

        case 'setAnswer':
            return produce(state, (draft) => {

                draft.questionAnswer.answer = action.payload as string;

            });

        case 'setDeffer':
            return produce(state, (draft) => {

                draft.defferSave = action.payload as boolean;

            });

        case 'setQuestionValidation':
            return produce(state, (draft) => {

                draft.validationSummary.questionError = action.payload as string;

            });

        case 'setAnswerValidation':
            return produce(state, (draft) => {

                draft.validationSummary.answerError = action.payload as string;

            });

        case 'setStartCountDown':
            return produce(state, (draft) => {

                draft.startCountDown = action.payload as boolean;

            });

        case 'setCounter':
            return produce(state, (draft) => {

                draft.counter = action.payload as number;

            });

        default:
            throw new Error('unknown command');

    }

}

function FormQA({ className, variant, questionAnswer, onSubmit, onCancel }: PropTypes) {

    const [state, dispatch] = useReducer(reducer, getInitialState(questionAnswer));

    useEffect(() => {

        let intervalId: NodeJS.Timer;

        if (state.startCountDown) {

            intervalId = setInterval(() => {

                if (state.counter === 1) {

                    onSubmit(state.questionAnswer);
                    clearInterval(intervalId);

                }

                dispatch({ type: 'setCounter', payload: state.counter - 1 });

            }, 1000);

        }

        return () => clearInterval(intervalId);

    }, [state.startCountDown, state.counter]);

    const validate = (): boolean => {

        let result = true;

        if (state.questionAnswer.question.trim().length === 0) {

            result = false;
            dispatch({ type: 'setQuestionValidation', payload: 'This field is required.' });

        } else dispatch({ type: 'setQuestionValidation', payload: '' });

        if (state.questionAnswer.answer.trim().length === 0) {

            result = false;
            dispatch({ type: 'setAnswerValidation', payload: 'This field is required.' });

        } else dispatch({ type: 'setAnswerValidation', payload: '' });

        return result;

    };

    const handleQuestionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

        dispatch({ type: 'setQuestion', payload: target.value });

    };

    const handleAnswerChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {

        dispatch({ type: 'setAnswer', payload: target.value });

    };

    const handelDefferChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

        dispatch({ type: 'setDeffer', payload: target.checked });

    };

    const handleSubmit = () => {

        if (onSubmit && validate()) {

            if (!state.defferSave) onSubmit(state.questionAnswer);

            else dispatch({ type: 'setStartCountDown', payload: true });

        }

    };

    const tooltip = variant === 'create' ?
        'Here you can create new questions and their answers.'
        :
        'Here you can update the selected question and its answer.';

    return (

        <form className={`form-qa ${className} ${state.startCountDown ? 'form-qa--count-down' : ''}`} data-counter={state.counter}>

            <Tooltip tip={tooltip}>

                <h2 className="form-qa__heading">
                    {variant === 'create' ? 'Create a new question' : 'Update the selected question'}
                </h2>

            </Tooltip>

            <TextInput
                label="Question"
                className="form-qa__question-input"
                variant="single-line"
                value={state.questionAnswer.question}
                onChange={handleQuestionChange}
                errorMessage={state.validationSummary.questionError}
            />

            <TextInput
                label="Answer"
                className="form-qa__answer-input"
                variant="multi-line"
                value={state.questionAnswer.answer}
                onChange={handleAnswerChange}
                errorMessage={state.validationSummary.answerError}
            />

            <Checkbox
                className="form-qa__delay-checkbox"
                label="Deferred save"
                checked={state.defferSave}
                onChange={handelDefferChange}
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

type ActionType = {
    type: string,
    payload: string | boolean | number
}

type StateType = {

    questionAnswer: QuestionAnswerType,

    validationSummary: { [key: string]: string },

    defferSave: boolean,

    startCountDown: boolean,

    counter: number
}

export { FormQA };
