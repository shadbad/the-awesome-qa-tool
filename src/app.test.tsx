/* eslint-disable padded-blocks */
import { screen, fireEvent, render, act, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { App } from './app';

describe('App Integration Test Suit', () => {
    const addItem = async (question: string, answer: string) => {
        const createButton = screen.getByRole('button', { name: 'Create new question' });

        await user.click(createButton);

        const questionInput = screen.getByRole('textbox', { name: 'Question' });

        await user.type(questionInput, question);

        const answerInput = screen.getByRole('textbox', { name: 'Answer' });

        await user.type(answerInput, answer);

        const submitButton = screen.getByRole('button', { name: 'Create Question' });

        await user.click(submitButton);
    };

    const confirmItemExists = async (question: string, answer: string) => {
        const newQuestion = screen.queryByRole('button', { name: question });

        if (!newQuestion) return false;

        const container = newQuestion?.parentElement;

        if (!container) throw new Error('Can not find the parent container.');

        const newAnswer = within(container).queryByText(answer);

        return newAnswer != null;
    };

    const confirm = async () => {
        const confirmButton = screen.getByRole('button', { name: 'Ok' });

        await user.click(confirmButton);
    };

    const getItemButton = async (question: string, answer: string, button: 'edit' | 'delete') => {
        const questionElement = screen.queryByRole('button', { name: question });

        expect(questionElement).toBeInTheDocument();

        const container = questionElement?.parentElement;

        if (container == null) throw new Error('Can not find the parent container.');

        const answerElement = within(container).queryByText(answer);

        expect(answerElement).toBeInTheDocument();

        return within(container).getByTestId(button === 'delete' ? 'icon-trash' : 'icon-edit');
    };

    beforeEach(async () => {
        user.setup();

        await act(() => {
            render(<App />);
        });
    });

    it('Adds new question/answer', async () => {
        await addItem('Question 1', 'Answer 1');

        expect(await confirmItemExists('Question 1', 'Answer 1')).toBeTruthy();
    });

    it('Can delete individual question/answers', async () => {
        const deleteButton = await getItemButton('Question 1', 'Answer 1', 'delete');

        await act(() => {
            fireEvent.click(deleteButton);
        });

        await confirm();

        expect(screen.queryByText('Question 1')).not.toBeInTheDocument();
    });

    it('Can update individual question/answer', async () => {
        expect(await confirmItemExists('How to add a question?', 'Just click the add button.')).toBeTruthy();

        const editButton = await getItemButton('How to add a question?', 'Just click the add button.', 'edit');

        await user.click(editButton);

        expect(screen.queryByRole('heading', { name: 'Update the selected question' })).toBeInTheDocument();

        const questionInput = screen.getByRole('textbox', { name: 'Question' });

        expect(questionInput).toHaveValue('How to add a question?');

        await user.clear(questionInput);

        await user.type(questionInput, 'Question 1');

        const answerInput = screen.getByRole('textbox', { name: 'Answer' });

        expect(answerInput).toHaveValue('Just click the add button.');

        await user.clear(answerInput);

        await user.type(answerInput, 'Answer 1');

        const submitButton = screen.getByRole('button', { name: 'Update Question' });

        await user.click(submitButton);

        expect(screen.queryByRole('button', { name: 'How to add a question?' })).not.toBeInTheDocument();

        expect(await confirmItemExists('Question 1', 'Answer 1')).toBeTruthy();
    });

    it('Can delete all question/answers', async () => {
        const qaItems = screen.queryAllByText(/(?:)/, { selector: '.view-qa' });

        expect(qaItems.length).toBeGreaterThanOrEqual(1);

        const deleteAllButton = screen.getByRole('button', { name: 'Delete all' });

        await user.click(deleteAllButton);

        await confirm();

        expect(screen.queryByText(/(?:)/, { selector: '.view-qa' })).not.toBeInTheDocument();
    });

    it('Can sort items by question from z to a', async () => {
        await addItem('Question 1', 'Answer 1');
        await addItem('Question 2', 'Answer 2');
        await addItem('Question 3', 'Answer 3');

        expect(screen.queryAllByText(/(?:)/, { selector: '.view-qa' })).toHaveLength(3);

        const AlphabeticallyDesc = screen.getByRole('button', { name: 'Alphabetically, Z-A' });

        await user.click(AlphabeticallyDesc);

        const items = screen.queryAllByText(/(?:)/, { selector: '.view-qa' });

        items.forEach((item, index) => {
            expect(item.querySelector('.view-qa__question')?.textContent).toBe(`Question ${items.length - index}`);
        });
    });

    it('Can sort items by question from a to z', async () => {
        expect(screen.queryAllByText(/(?:)/, { selector: '.view-qa' })).toHaveLength(3);

        const AlphabeticallyDesc = screen.getByRole('button', { name: 'Alphabetically, A-Z' });

        await user.click(AlphabeticallyDesc);

        const items = screen.queryAllByText(/(?:)/, { selector: '.view-qa' });

        items.forEach((item, index) => {
            expect(item.querySelector('.view-qa__question')?.textContent).toBe(`Question ${index + 1}`);
        });
    });
});
