import { IPaginationResponse } from '../interfaces/pagination-response.interface.ts';
import { ICharacter } from '../interfaces/character.interface.ts';

export interface StartWarsService {
    searchCharacters: (string) => Promise<IPaginationResponse<ICharacter>>;
}

const URL = 'https://swapi.dev/api/people';

const api: StartWarsService = {
    searchCharacters: (term) => {
        const query = term ? `?search=${term}` : '';
        return fetch(`${URL}${query}`).then((response) => response.json());
    },
};

export default api;
