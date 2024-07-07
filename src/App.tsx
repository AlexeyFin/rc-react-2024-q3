import './App.scss';
import { Main } from './views/main/main.tsx';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';

function App() {
    return (
        <main>
            <ErrorBoundary>
                <Main />
            </ErrorBoundary>
        </main>
    );
}

export default App;
