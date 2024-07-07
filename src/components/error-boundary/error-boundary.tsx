import React from 'react';
import { Alert } from '../alert/alert.tsx';
import { eAlertTypes } from '../../enums/alert-types.enum.ts';

interface ErrorBoundaryProps {
    children;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log(error, '<0getDerivedStateFromError');
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('my err Error:', error, errorInfo);
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
