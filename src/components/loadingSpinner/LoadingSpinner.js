import loading from '../../resources/Spinner-1.3s-200px.svg'

const LoadingSpinner = () => {
    return <div style={{ height: '100%', background: 'white', display: 'flex',justifyContent:'center' }} >
        <img src={loading} style={{ height: '100%', background: 'white' }} />
    </div >
}


export default LoadingSpinner