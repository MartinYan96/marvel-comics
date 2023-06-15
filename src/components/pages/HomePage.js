import RandomCharPerson from '../randomCharPerson/randomCharPerson';
import CharContent from '../charContent/charContent';
import vision from '../../resources/img/vision.png'
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


const HomePage = () => {
    return (
        <>
            <ErrorBoundary>
                <RandomCharPerson />
            </ErrorBoundary>
            <ErrorBoundary>
                <CharContent />
            </ErrorBoundary>

            <img className='visionImg' src={vision} alt="vision" />
        </>
    )
}

export default HomePage