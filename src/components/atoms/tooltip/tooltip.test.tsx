import { screen, render, fireEvent } from '@testing-library/react';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {

    const renderSample = () => render(<Tooltip tip="sample tip">Sample</Tooltip>);

    it('initially does not show the tip', () => {

        renderSample();

        expect(screen.queryByText('sample tip')).toBeNull();

    });

    it('shows the tip on mouse hover', () => {

        renderSample();

        const elementWithTooltip = screen.getByText('Sample');

        fireEvent.mouseEnter(elementWithTooltip);

        expect(screen.getByText('sample tip')).not.toBeNull();

        fireEvent.mouseLeave(elementWithTooltip);

        expect(screen.queryByText('sample tip')).toBeNull();

    });

});
