import './appBaner.scss'
import avengers_logo from '../../resources/img/Avengers_logo.png'
import avengers from '../../resources/img/Avengers.png'

const AppBaner = () => {
    return (
        <div className="comicsHeader">
            <img src={avengers} alt="" />
            <p className='comicsTitle'>
                New comics every week!
                <br />
                Stay tuned!
            </p>
            <img src={avengers_logo} alt="" />
        </div>
    )
}
export default AppBaner