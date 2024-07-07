import { ICharacter } from '../../interfaces/character.interface.ts';
import { render, screen } from '@testing-library/react';
import { CharacterCard } from './character-card.tsx';
import { CHARACTER_1 } from '../test/characters.mock.ts';

describe('Character-card', () => {
    it('should render the component', () => {
        const mockCharacter: ICharacter = CHARACTER_1;

        render(<CharacterCard data={mockCharacter} />);

        expect(screen.getByText(`Name: ${mockCharacter.name}`)).toBeTruthy();
    });
});
