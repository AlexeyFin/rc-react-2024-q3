import { render, screen } from '@testing-library/react';
import { SearchResult } from './results.tsx';
import { CHARACTER_1, CHARACTER_2 } from '../test/characters.mock.ts';
import { CharacterCard } from '../character-card/character-card.tsx';
import { ICharacter } from '../../interfaces/character.interface.ts';

describe('SearchResult', () => {
    it('should should render the component with children', () => {
        const mockResult: ICharacter[] = [CHARACTER_1, CHARACTER_2];
        render(<SearchResult results={mockResult} Child={CharacterCard} />);

        mockResult.forEach((item) => {
            expect(screen.getByText(`Name: ${item.name}`)).toBeTruthy();
        });
    });

    it('should render the component with empty list notification', () => {
        const mockResult: ICharacter[] = [];
        render(<SearchResult results={mockResult} Child={CharacterCard} />);

        const alertElement = screen.getByRole('alert');

        expect(alertElement).toBeTruthy();
        expect(alertElement.textContent).toBe('No items found');
    });
});
