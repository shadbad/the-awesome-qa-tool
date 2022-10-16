import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { QuestionAnswerType } from 'store/types';
import { FormQA } from './formQA';

describe('FormQA', () => {

    let submitResult: QuestionAnswerType | null = null;

    const renderFormQA = (questionAnswer?: QuestionAnswerType | null, isEdit = false) => {

        const emptyQA: QuestionAnswerType = questionAnswer || {
            id: '123',
            date: new Date(2022, 1, 1).valueOf(),
            question: '',
            answer: ''
        };

        const handleSubmit = (qa: QuestionAnswerType) => {

            submitResult = qa;

        };

        const handleCancel = () => 'cancel clicked';

        render(<FormQA variant={isEdit ? 'update' : 'create'} questionAnswer={emptyQA} onCancel={handleCancel} onSubmit={handleSubmit} />);

    };

    const getFormParts = (): { [key: string]: HTMLElement } => (

        {
            question: screen.getByLabelText('Question'),
            answer: screen.getByLabelText('Answer'),
            deferred: screen.getByLabelText('Deferred save'),
            submit: screen.getByText(/(Create|Update) Question/)
        }

    );

    beforeEach(() => {

        submitResult = null;

    });

    it('Renders the correct title and button in create mode', () => {

        renderFormQA();

        const title = screen.queryByText('Create a new question');

        const submit = screen.queryByText('Create Question');

        expect(title).not.toBeNull();
        expect(submit).not.toBeNull();

    });

    it('Renders the correct title and button in update mode', () => {

        renderFormQA(null, true);

        const title = screen.queryByText('Update the selected question');

        const submit = screen.queryByText('Update Question');

        expect(title).not.toBeNull();
        expect(submit).not.toBeNull();

    });

    it('Validates all fields for emptiness', () => {

        renderFormQA();

        const formParts = getFormParts();

        fireEvent.click(formParts.submit);

        const error = screen.getAllByText('This field is required.');

        expect(error).toHaveLength(2);

    });

    it('Creates a valid new QA object on submit', () => {

        renderFormQA();

        const formParts = getFormParts();

        fireEvent.change(formParts.question, { target: { value: 'Test question' } });
        fireEvent.change(formParts.answer, { target: { value: 'Test answer' } });
        fireEvent.click(formParts.submit);

        expect(submitResult).not.toBeNull();
        expect(submitResult?.question).toBe('Test question');
        expect(submitResult?.answer).toBe('Test answer');

    });

    it('Populates the input fields in update mode', () => {

        const testObject = {

            id: '123',
            date: new Date(2022, 1, 1).valueOf(),
            question: 'Test question',
            answer: 'Test answer'
        };

        renderFormQA(testObject, true);

        const formParts = getFormParts();

        expect(formParts.question).toHaveValue('Test question');
        expect(formParts.answer).toHaveValue('Test answer');

    });

    it('waits 5s before submitting if the deferred save option is checked', async () => {

        jest.useFakeTimers();
        renderFormQA();
        const formParts = getFormParts();

        fireEvent.change(formParts.question, { target: { value: 'Test question' } });
        fireEvent.change(formParts.answer, { target: { value: 'Test answer' } });
        fireEvent.click(formParts.deferred);
        fireEvent.click(formParts.submit);

        expect(submitResult).toBeNull();

        act(() => {

            jest.advanceTimersByTime(5000);

        });

        await waitFor(() => {

            expect(submitResult).not.toBeNull();
            expect(submitResult?.question).toBe('Test question');
            expect(submitResult?.answer).toBe('Test answer');

        }, { timeout: 5000 });

    });

});
