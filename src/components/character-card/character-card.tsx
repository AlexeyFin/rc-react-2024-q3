import React from 'react';
import { ICharacter } from '../../interfaces/character.interface.ts';

interface CharacterCardProps {
    data: ICharacter;
}

interface CharacterCardState {}

export class CharacterCard extends React.Component<
    CharacterCardProps,
    CharacterCardState
> {
    render() {
        const { data } = this.props;
        return (
            <>
                <h6>Name: {data.name}</h6>
                <p className="mb-0">Movies: {data.films.length}</p>
            </>
        );
    }
}
