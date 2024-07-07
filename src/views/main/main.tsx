import { Component } from 'react';
import { Search } from '../../components/search/search.tsx';
import { ICharacter } from '../../interfaces/character.interface.ts';
import { CharacterCard } from '../../components/character-card/character-card.tsx';
import { LocalStorageKeysEnum } from '../../enums/local-storage.keys.enum.ts';
import api from '../../services/start-wars.service.ts';
import { Alert } from '../../components/alert/alert.tsx';
import { eAlertTypes } from '../../enums/alert-types.enum.ts';
import { SearchResult } from '../../components/results/results.tsx';

interface MainState {
    results: ICharacter[];
    searchTerm: string;
    isLoading: boolean;
    error: Error | null;
}

interface MainProps {}

export class Main extends Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            results: [],
            searchTerm: '',
            isLoading: false,
            error: null,
        };
        this.onSearch = this.onSearch.bind(this);
        this.setSearchTerm = this.setSearchTerm.bind(this);
        this.throwError = this.throwError.bind(this);
    }

    componentDidMount() {
        const savedSearchTerm = localStorage.getItem(
            LocalStorageKeysEnum.SearchTerm
        );
        if (savedSearchTerm) {
            this.onSearch(savedSearchTerm);
        } else {
            this.onSearch('');
        }
    }

    onSearch(term: string) {
        this.setState({ ...this.state, searchTerm: term, isLoading: true });
        localStorage.setItem(LocalStorageKeysEnum.SearchTerm, term);
        api.searchCharacters(term).then((res) => {
            this.setState({
                ...this.state,
                results: res.results,
                isLoading: false,
            });
        });
    }

    setSearchTerm(term: string) {
        this.setState({ searchTerm: term });
    }

    throwError() {
        this.setState({ ...this.state, error: new Error('Test error') });
    }

    render() {
        if (this.state.error) {
            throw new Error(this.state.error.message);
        }
        return (
            <div className="container py-5">
                <Search
                    onSearch={this.onSearch}
                    searchTerm={this.state.searchTerm}
                    setSearchTerm={this.setSearchTerm}
                />
                <hr />
                <p>
                    <button
                        className="btn btn-info w-100"
                        onClick={this.throwError}
                        data-testid="test-throw-error"
                    >
                        Throw Error
                    </button>
                </p>
                {this.state.isLoading ? (
                    <Alert
                        message="Loading in progress...."
                        type={eAlertTypes.INFO}
                    />
                ) : (
                    <SearchResult<ICharacter>
                        results={this.state.results}
                        Child={CharacterCard}
                    ></SearchResult>
                )}
            </div>
        );
    }
}
