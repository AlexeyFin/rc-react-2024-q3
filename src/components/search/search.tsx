import { Component } from 'react';

type SearchProps = {
    onSearch: (query: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

interface SearchState {}

export class Search extends Component<SearchProps, SearchState> {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.props.setSearchTerm(event.target.value);
    }

    handleSearch(event): void {
        event.preventDefault();
        this.props.onSearch(this.props.searchTerm);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2>
                        Search for StarWars Character {this.props.searchTerm}
                    </h2>
                </div>
                <div className="card-body">
                    <form
                        className="input-group mb-3"
                        onSubmit={this.handleSearch}
                    >
                        <input
                            type="text"
                            className="form-control"
                            value={this.props.searchTerm || ''}
                            onChange={this.handleInputChange}
                        />
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
