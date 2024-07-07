import React from 'react';
import { eAlertTypes } from '../../enums/alert-types.enum.ts';

interface AlertProps {
    message: string;
    type: eAlertTypes;
}

interface AlertState {}

export class Alert extends React.Component<AlertProps, AlertState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`alert ${this.props.type}`} role="alert">
                {this.props.message}
            </div>
        );
    }
}
