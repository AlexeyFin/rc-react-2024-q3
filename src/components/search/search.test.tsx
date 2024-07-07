import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './search.tsx';

describe('Search', () => {
    it('should render the component', () => {
        render(
            <Search
                searchTerm=""
                setSearchTerm={() => {}}
                onSearch={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText('Search...');
        const buttonElement = screen.getByText('Search');

        expect(inputElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
    });

    it('should call setSearchTerm on input change', async () => {
        const setSearchTerm = vi.fn();
        render(
            <Search
                searchTerm=""
                setSearchTerm={setSearchTerm}
                onSearch={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText('Search...');
        const inputText = 'test';
        await userEvent.type(inputElement, inputText);

        expect(setSearchTerm).toHaveBeenCalledTimes(inputText.length);
    });

    it('should call onSearch on form submit', () => {
        const handleSearch = vi.fn().mockResolvedValue('');
        render(
            <Search
                searchTerm=""
                setSearchTerm={() => {}}
                onSearch={handleSearch}
            />
        );

        const formElement = screen.getByRole('form');
        fireEvent.submit(formElement);

        expect(handleSearch).toHaveBeenCalledTimes(1);
    });

    it('should display the correct value in the input', () => {
        const mockTerm = 'initial search';
        render(
            <Search
                searchTerm={mockTerm}
                setSearchTerm={() => {}}
                onSearch={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText('Search...');
        expect(inputElement).toHaveValue(mockTerm);
    });
});
