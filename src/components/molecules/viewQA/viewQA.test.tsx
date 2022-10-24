import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionAnswerType } from 'store/types';
import { ViewQA } from './viewQA';

describe('ViewQA', () => {
    let deleteResult: string | null = null;

    let editResult: QuestionAnswerType | null = null;

    const sample = {
        id: '123',
        date: new Date(2022, 1, 1).valueOf(),
        question: 'Test question',
        answer: 'Test answer'
    };

    const mockOnDelete = (id: string) => {
        deleteResult = id;
    };

    const mockOnEdit = (qa: QuestionAnswerType) => {
        editResult = qa;
    };

    const renderViewQA = () => render(<ViewQA questionAnswer={sample} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const getParts = () => ({
        question: screen.getByText('Test question'),
        answer: screen.getByText('Test answer'),
        editButton: screen.getByTestId('icon-edit'),
        deleteButton: screen.getByTestId('icon-trash')
    });

    beforeEach(() => {
        deleteResult = null;
        editResult = null;
    });

    it('Renders correctly', () => {
        renderViewQA();

        const parts = getParts();

        expect(parts.question).toHaveTextContent('Test question');
        expect(parts.answer).toHaveTextContent('Test answer');
        expect(parts.editButton).not.toBeNull();
        expect(parts.deleteButton).not.toBeNull();
    });

    it('Passes the id to the item delete event handler', () => {
        renderViewQA();
        const parts = getParts();

        fireEvent.click(parts.deleteButton);

        expect(deleteResult).toBe('123');
    });

    it('Passes the QA object to the item edit event handler', () => {
        renderViewQA();
        const parts = getParts();
        fireEvent.click(parts.editButton);
        expect(JSON.stringify(editResult)).toEqual(JSON.stringify(sample));
    });

    it('Shows the answer when clicked on the question', () => {
        renderViewQA();

        const parts = getParts();

        const container: HTMLElement | null = parts.question.parentElement;

        expect(container).not.toBeNull();

        expect(container?.classList).not.toContain('view-qa--expanded');

        fireEvent.click(parts.question);

        expect(container?.classList).toContain('view-qa--expanded');
    });
});
