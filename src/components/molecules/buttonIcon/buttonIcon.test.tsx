import { screen, render, fireEvent } from '@testing-library/react';
import { ButtonIcon } from './buttonIcon';

describe('ButtonIcon', () => {

    const renderSut = () => render(<ButtonIcon text="test button" iconName="test" />);

    it('renders a button containing text', () => {

        renderSut();

        const renderedButton = screen.getByText('test button');

        expect(renderedButton).not.toBeNull();

    });

    it('renders a button containing an icon', () => {

        renderSut();
        const renderedIcon = screen.getByTestId('icon-test');
        expect(renderedIcon).not.toBeNull();

    });

    it('executes the passed onClick function', () => {

        let clickResult = false;

        const onClickTest = () => {

            clickResult = true;

        };

        render(<ButtonIcon text="test button" iconName="test" onClick={onClickTest} />);

        const renderedButton = screen.getByText('test button');

        fireEvent.click(renderedButton);

        expect(clickResult).toEqual(true);

    });

});
