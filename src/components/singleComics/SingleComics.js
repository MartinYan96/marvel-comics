import './singleComics.scss'
import { Link } from 'react-router-dom'

const SingleComics = ({ data }) => {
    console.log(data)
    return (
        <section className='singleComics'>
            <img className='singleComicsImage' src={data.images} alt="" />
            <div className='comicsInfo'>
                <h2 className='comicsName'> {data.title}</h2>
                <p className='comicsDescription'>{data.description}</p>
                <p className='comicsPrics'>{data.price}</p>
                <p className='comicsLanguage'>Languages: {data.languages}</p>
                <p className='pageCount'>{data.pageCount} $ </p>
            </div>
            <Link to="/comics">Back to all</Link>
        </section>
    )
}

export default SingleComics