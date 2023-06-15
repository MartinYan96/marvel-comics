import './comics.scss'
import useMarvelService from '../../services/MarvelService'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'
import ServicesError from '../../services/ServicesError'
import { Link } from 'react-router-dom'
import AppBaner from '../appBaner/AppBaner'

const Comics = () => {
    const [newItemLoading, setNewItemLoading] = useState(false)
    const { loader, error, getComics, getTotalComics } = useMarvelService()
    const [comicsInfo, setComicsInfo] = useState([])
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        getComices(offset, true)
    }, [])

    useEffect(() => {
        getTotalComics().then(total => setTotal(total.data.total))
    }, [])


    const getComices = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getComics(offset)
            .then(res => {
                console.log(res)
                setComicsInfo(res)
                loadMoreComics(res)
            })
    }

    const loadMoreComics = (res) => {
        let ended = false

        if (offset >= total && total !== null) {
            ended = true
        }

        setOffset(() => offset + 8)
        setComicsInfo([...comicsInfo, ...res])
        setNewItemLoading(false)
        setCharEnded(ended)
    }


    const spiner = loader && !newItemLoading ? <LoadingSpinner /> : <ComicsContent />
    const comicsRespose = error && !loader ? <ServicesError /> : spiner

    return (
        <section className="comics">
            <AppBaner />
            {comicsRespose}
            <button className='buttons loadMore'
                onClick={() => { getComices(offset) }}
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none ' : 'block' }}
            >
                LOAD MORE
            </button>
        </section>
    )

    function ComicsContent() {
        return (
            <div className="comicsContent">
                {comicsInfo.map((item, i) => {
                    return (
                        <div key={i} className='comices' >
                            <Link to={`/comics/${item.id}`} >
                                <img className='images' src={item.images} alt="" />
                                <p className='title'>{item.title}</p>
                                <p className='price'>{item.price}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }


}

export default Comics

