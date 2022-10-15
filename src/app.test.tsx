import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './app';

describe('Q/A list', () => {

    it('initially shows a question', async () => {

        render(<App />);

        const defaultQuestion = await screen.findByText('How to add a question?');

        expect(defaultQuestion).not.toBeNull();

    });

    it('initially does not show the answer', async () => {

        render(<App />);

        const defaultAnswer = await screen.findByText('Just click the add button.');

        expect(defaultAnswer.parentElement?.classList.contains('view-qa--expanded')).toBeFalsy();

    });

    it('shows the answer when clicked on the question', async () => {

        render(<App />);

        const defaultQuestion = await screen.findByText('How to add a question?');

        fireEvent.click(defaultQuestion);

        expect(defaultQuestion.parentElement?.classList.contains('view-qa--expanded')).toBeTruthy();

    });

});
