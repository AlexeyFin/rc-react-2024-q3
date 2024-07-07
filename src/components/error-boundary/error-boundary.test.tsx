import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './error-boundary.tsx';

describe('ErrorBoundary', () => {
    it("should render the component and it's children", () => {
        const mockNodeNextContent = 'Hello World';
        const mockNode = <>{mockNodeNextContent}</>;
        render(<ErrorBoundary children={mockNode} />);

        expect(screen.getByText(mockNodeNextContent)).toBeTruthy();
    });

    it('should render the error view if error has happened', () => {
        const spyError = vi.spyOn(console, 'error');
        const spyLog = vi.spyOn(console, 'log');
        spyError.mockImplementation(() => {});
        spyLog.mockImplementation(() => {});

        const Throw = () => {
            throw new Error('bad');
        };

        render(
            <ErrorBoundary>
                <Throw />
            </ErrorBoundary>
        );

        expect(spyLog).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('alert')).toBeTruthy();
        spyError.mockRestore();
        spyLog.mockRestore();
    });
});
