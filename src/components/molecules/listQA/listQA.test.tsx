import { screen, render, fireEvent } from '@testing-library/react';
import { QuestionAnswerType } from 'store/types';
import { ListQA } from './listQA';

describe('ListQA', () => {

    let deleteResult: string | null = null;

    let editResult: QuestionAnswerType | null = null;

    const generateSamples = (count: number): QuestionAnswerType[] => {

        const result: QuestionAnswerType[] = [];

        for (let index = 0; index < count; index += 1) {

            result.push({

                id: `test-item${index + 1}`,
                date: new Date(2022, 1, index + 1).valueOf(),
                question: `Test question ${index + 1}`,
                answer: `Test answer ${index + 1}`

            });

        }

        return result;

    };

    const mockOnDelete = (id: string) => {

        deleteResult = id;

    };

    const mockOnEdit = (qa: QuestionAnswerType) => {

        editResult = qa;

    };

    const renderListQA = (itemsCount: number) => {

        const items: QuestionAnswerType[] = itemsCount === 0 ? [] : generateSamples(itemsCount);

        return render(<ListQA items={items} onItemDelete={mockOnDelete} onItemEdit={mockOnEdit} />);

    };

    it('Shows no question yet message when it is empty', () => {

        renderListQA(0);

        expect(screen.getByText('No questions yet :-(')).not.toBeNull();

    });

    it('Lists all the question/answer items', () => {

        renderListQA(5);

        expect(screen.getAllByText(/^Test question/)).toHaveLength(5);

    });

    it('Displays 10 question/answer items per page', () => {

        renderListQA(15);

        expect(screen.getAllByText(/^Test question/)).toHaveLength(10);

        expect(screen.getAllByText(/[1-2]/, { selector: '.paginator__page-link' })).toHaveLength(2);

    });

    it('Switch pages', () => {

        renderListQA(15);

        const page2btn = screen.getByText('2', { selector: '.paginator__page-link' });

        fireEvent.click(page2btn);

        expect(screen.getAllByText(/^Test question/)).toHaveLength(5);

    });

});
