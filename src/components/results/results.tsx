import { Component, ComponentClass } from 'react';
import { Alert } from '../alert/alert.tsx';
import { eAlertTypes } from '../../enums/alert-types.enum.ts';

interface SearchResultProps<T> {
    results: T[];
    Child: ComponentClass<{ data: T }>;
}

interface SearchResultState {}

export class SearchResult<T> extends Component<
    SearchResultProps<T>,
    SearchResultState
> {
    constructor(props: SearchResultProps<T>) {
        super(props);
    }

    render() {
        const { Child, results } = this.props;

        if (results.length > 0) {
            return (
                <div>
                    <ul className="list-group">
                        {results.map((resultItem, index) => (
                            <li className="list-group-item" key={index}>
                                <Child data={resultItem} />
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <Alert type={eAlertTypes.INFO} message="No items found" />;
        }
    }
}
