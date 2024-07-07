import React, { ErrorInfo } from 'react';
import { Alert } from '../alert/alert.tsx';
import { eAlertTypes } from '../../enums/alert-types.enum.ts';
import { types } from 'sass';
import Error = types.Error;

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert
                    message="Error has happened :("
                    type={eAlertTypes.DANGER}
                />
            );
        }

        return this.props.children;
    }
}
