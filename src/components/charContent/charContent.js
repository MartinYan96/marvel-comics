import './charContent.scss'
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import ServicesError from '../../services/ServicesError'
import CharSearch from './CharSearch';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Nocomics = () => {
    return <p> no comics</p>
}


const CharContent = () => {
    const { loader, error, request, getAllPerson, totalNumber } = useMarvelService()

    const [list, setList] = useState([])
    const [personInfo, setPersonInfo] = useState({})
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    const [total, setTotal] = useState(null)

    const charContentplus = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllPerson(offset)
            .then(loaderPersons)
    }

    useEffect(() => {
        totalNumber().then(total => setTotal(total.data.total))
        charContentplus(offset, true)
    }, [])

    const loaderPersons = (res) => {
        let ended = false

        if (offset >= total && total !== null) {
            ended = true
        }

        setList([...list, ...res])
        setOffset(() => offset + 9)
        setNewItemLoading(false)
        setCharEnded(ended)
    }

    return (
        <section className="charContent">
            {loader && !newItemLoading ? LoadingSpinner() :
                <div className="personListBlock">
                    <div className="personList">
                        {list.map((item, index) => {
                            let imgStyle = { 'objectFif': 'cover' }
                            if (item.description === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                                imgStyle = { 'objectFif': 'unset' }
                            }

                            return (<div key={item.id} className='personItem' onClick={() => { setPersonInfo(item) }} >
                                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                                <p className='name'>{item.name}</p>
                            </div>)
                        })}


                    </div>
                    <button className='buttons loadMore'
                        disabled={newItemLoading}
                        onClick={() => charContentplus(offset)}
                        style={{ display: charEnded ? 'none ' : 'block' }}
                    >LOAD MORE
                    </button>
                </div>
            }


            <div className="personInfo">
                <div className='personInfoBlock'>
                    <div className="imgAndName">
                        <img src={personInfo.thumbnail} alt="" />
                        <div className='personNameAndLink'>
                            <p className='personName'>{personInfo.name}</p>
                            <a href={personInfo.homepage} className='buttons homepage'>HOMEPAGE</a>
                            <a href={personInfo.wiki} className='buttons wiki'>WIKI</a>
                        </div>
                    </div>
                    <p className="charInfo">
                        {personInfo.description}
                    </p>
                    <ul className="comicsPerson">Comics:
                        {
                            personInfo.comics === undefined || personInfo.comics.length === 0 ? < Nocomics /> : personInfo.comics.map((item, i) => {
                                if (i > 10) return
                                return <li key={i} className='comicsItem' > {item.name}</li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <CharSearch />
                </div>
            </div>
        </section >
    )
}


export default CharContent