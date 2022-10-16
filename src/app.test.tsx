/* eslint-disable padded-blocks */
import { screen, fireEvent, render, act, getByTestId, queryByText } from '@testing-library/react';
import { App } from './app';

describe('App Integration Test Suit', () => {

    const addItem = async (question: string, answer: string) => {

        const createButton = screen.getByText('Create new question');

        await act(() => { fireEvent.click(createButton); });

        const questionInput = screen.getByLabelText('Question');

        fireEvent.change(questionInput, { target: { value: question } });

        const answerInput = screen.getByLabelText('Answer');

        fireEvent.change(answerInput, { target: { value: answer } });

        const submitButton = screen.getByText('Create Question');

        await act(() => { fireEvent.click(submitButton); });

    };

    const confirmItemExists = async (question: string, answer: string) => {

        const newQuestion = screen.queryByText(question, { selector: '.view-qa__question' });

        if (!newQuestion) return false;

        const container = newQuestion?.parentElement;

        if (!container) throw new Error('Can not find the parent container.');

        const newAnswer = queryByText(container, answer);

        return newAnswer != null;
    };

    const confirm = async () => {

        const confirmButton = screen.getByText('Ok');

        await act(() => { fireEvent.click(confirmButton); });

    };

    const getItemButton = async (question: string, answer: string, button: 'edit' | 'delete') => {

        const questionElement = screen.queryByText(question);

        expect(questionElement).not.toBeNull();

        const container = questionElement?.parentElement;

        if (container == null) throw new Error('Can not find the parent container.');

        expect(queryByText(container, answer)).not.toBeNull();

        return getByTestId(container, button === 'delete' ? 'icon-trash' : 'icon-edit');

    };

    beforeEach(async () => {

        await act(() => { render(<App />); });

    });

    it('Adds new question/answer', async () => {

        await addItem('Question 1', 'Answer 1');

        expect(await confirmItemExists('Question 1', 'Answer 1')).toBeTruthy();

    });

    it('Can delete individual question/answers', async () => {

        const deleteButton = await getItemButton('Question 1', 'Answer 1', 'delete');

        await act(() => { fireEvent.click(deleteButton); });

        await confirm();

        expect(screen.queryByText('Question 1')).toBeNull();

    });

    it('Can update individual question/answer', async () => {

        expect(await confirmItemExists('How to add a question?', 'Just click the add button.')).toBeTruthy();

        const editButton = await getItemButton('How to add a question?', 'Just click the add button.', 'edit');

        await act(() => { fireEvent.click(editButton); });

        expect(screen.queryByText('Update the selected question')).not.toBeNull();

        const questionInput = screen.getByLabelText('Question') as HTMLInputElement;

        expect(questionInput.value).toBe('How to add a question?');

        fireEvent.change(questionInput, { target: { value: 'Question 1' } });

        const answerInput = screen.getByLabelText('Answer') as HTMLInputElement;

        expect(answerInput.value).toBe('Just click the add button.');

        fireEvent.change(answerInput, { target: { value: 'Answer 1' } });

        const submitButton = screen.getByText('Update Question');

        await act(() => { fireEvent.click(submitButton); });

        expect(screen.queryByText('How to add a question?')).toBeNull();

        expect(await confirmItemExists('Question 1', 'Answer 1')).toBeTruthy();

    });

    it('Can delete all question/answers', async () => {

        const qaItems = screen.queryAllByText(/(?:)/, { selector: '.view-qa' });

        expect(qaItems.length).toBeGreaterThanOrEqual(1);

        const deleteAllButton = screen.getByText('Delete all');

        await act(() => { fireEvent.click(deleteAllButton); });

        confirm();

        expect(screen.queryAllByText(/(?:)/, { selector: '.view-qa' })).toHaveLength(0);

    });

    it('Can sort items by question from z to a', async () => {

        await addItem('Question 1', 'Answer 1');
        await addItem('Question 2', 'Answer 2');
        await addItem('Question 3', 'Answer 3');

        expect(screen.queryAllByText(/(?:)/, { selector: '.view-qa' })).toHaveLength(3);

        const AlphabeticallyDesc = screen.getByText('Alphabetically, Z-A');

        await act(() => { fireEvent.click(AlphabeticallyDesc); });

        const items = screen.queryAllByText(/(?:)/, { selector: '.view-qa' });

        items.forEach((item, index) => {

            expect(item.querySelector('.view-qa__question')?.textContent).toBe(`Question ${items.length - index}`);

        });

    });

    it('Can sort items by question from a to z', async () => {

        expect(screen.queryAllByText(/(?:)/, { selector: '.view-qa' })).toHaveLength(3);

        const AlphabeticallyDesc = screen.getByText('Alphabetically, A-Z');

        await act(() => { fireEvent.click(AlphabeticallyDesc); });

        const items = screen.queryAllByText(/(?:)/, { selector: '.view-qa' });

        items.forEach((item, index) => {

            expect(item.querySelector('.view-qa__question')?.textContent).toBe(`Question ${index + 1}`);

        });

    });

});
