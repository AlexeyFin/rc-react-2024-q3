import { render, screen } from '@testing-library/react';
import { Alert } from './alert.tsx';
import { eAlertTypes } from '../../enums/alert-types.enum.ts';

describe('Alert', () => {
    it('should render the component', () => {
        const mockMessage = 'Mock message';

        render(<Alert message={mockMessage} type={eAlertTypes.INFO} />);
        const alertElement = screen.getByText(mockMessage);
        expect(alertElement).toBeTruthy();
        expect(alertElement.getAttribute('class')).toContain(eAlertTypes.INFO);
    });
});
