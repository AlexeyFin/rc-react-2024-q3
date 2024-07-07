import { render, screen, waitFor } from '@testing-library/react';
import { Main } from './main.tsx';
import { CHARACTER_1 } from '../../components/test/characters.mock.ts';
import { ICharacter } from '../../interfaces/character.interface.ts';
import api from '../../services/start-wars.service.ts';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { IPaginationResponse } from '../../interfaces/pagination-response.interface.ts';
import { LocalStorageKeysEnum } from '../../enums/local-storage.keys.enum.ts';

vi.mock('../../services/start-wars.service', async () => {
    const actual = await vi.importActual('../../services/start-wars.service');
    return {
        ...actual,
        searchCharacters: vi.fn(),
    };
});

describe('Main', () => {
    afterAll(() => {
        localStorage.clear();
        vi.resetAllMocks();
    });

    it('should render the component', () => {
        render(<Main />);
        expect(
            screen.getByText('Search for StarWars Character')
        ).toBeInTheDocument();
    });

    it('should perform a search and display results', async () => {
        const mockResults: ICharacter[] = [CHARACTER_1];
        const spy = vi.spyOn(api, 'searchCharacters').mockResolvedValueOnce({
            results: mockResults,
        } as IPaginationResponse<ICharacter>);

        render(<Main />);

        await userEvent.type(
            screen.getByTestId('search-input'),
            CHARACTER_1.name.split(' ')[0]
        );
        await userEvent.click(screen.getByTestId('search-submit'));

        await waitFor(() =>
            expect(spy).toHaveBeenCalledWith(CHARACTER_1.name.split(' ')[0])
        );
        await waitFor(() =>
            expect(
                screen.getByText(`Name: ${CHARACTER_1.name}`)
            ).toBeInTheDocument()
        );
    });

    it('should get the search term from localstorage and perform a search', async () => {
        const mockResults: ICharacter[] = [CHARACTER_1];
        const spy = vi.spyOn(api, 'searchCharacters').mockResolvedValueOnce({
            results: mockResults,
        } as IPaginationResponse<ICharacter>);

        const mockStoredTerm = 'luke';

        localStorage.setItem(LocalStorageKeysEnum.SearchTerm, mockStoredTerm);
        render(<Main />);

        const searchInput = await screen.findByTestId('search-input');

        expect(searchInput).toHaveValue(mockStoredTerm);

        await userEvent.click(screen.getByTestId('search-submit'));

        await waitFor(() => expect(spy).toHaveBeenCalledWith(mockStoredTerm));
        // await waitFor(() =>
        //     expect(
        //         screen.getByText(`Name: ${CHARACTER_1.name}`)
        //     ).toBeInTheDocument()
        // );
    });

    it('should throw an error', async () => {
        const spyError = vi.spyOn(console, 'error');
        spyError.mockImplementation(() => {});

        try {
            render(<Main />);
            await userEvent.click(screen.getByTestId('test-throw-error'));
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
