import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Comics from '../comics/Comics';

const ComicsPage = () => {
    return (
        <>
            <ErrorBoundary>
                <Comics />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage