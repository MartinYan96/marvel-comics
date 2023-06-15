import './singleChar.scss'
import { Link } from 'react-router-dom'

const SingleChar = ({ data }) => {
    console.log(data)
    return (
        <section className='singleChar'>
            <img className='singleCharImage' src={data.images} alt="" />
            <div className='charInfo'>
                <h2 className='charName'>{data.name}</h2>
                <p className='charDescription'>{data.description}</p>
            </div>
            <Link to="/">Back to all</Link>
        </section>
    )
}

export default SingleChar 