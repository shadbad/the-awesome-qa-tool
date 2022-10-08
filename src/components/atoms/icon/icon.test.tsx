import { screen, render } from '@testing-library/react';
import { Icon } from './icon';

describe('Icon', () => {

    it('renders an svg icon', () => {

        render(<Icon name="check" />);

        expect(screen.findByTestId('icon-check')).not.toBeNull();

    });

});
