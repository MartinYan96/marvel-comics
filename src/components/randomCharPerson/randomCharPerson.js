import './randomCharPerson.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import ServicesError from '../../services/ServicesError'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'



const RandomCharPerson = () => {
    const [person, setPerson] = useState({})
    const { loader, error,clearError, getPerson } = useMarvelService()

    useEffect(() => {
        marvelsPersons()
    }, [])

    const loaderPerson = (res) => {
        setPerson(res)
    }

    const marvelsPersons = async () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getPerson(id)
            .then(res => loaderPerson(res))
    }

    const { name, description, thumbnail, homepage, wiki } = person

    const errors = error ? <ServicesError /> : null
    const spinner = loader ? <LoadingSpinner /> : null
    let imgStyle = { 'objectFif': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFif': 'unset' }
    }
    const content = !(error || spinner) ? <div className='randomPerson'>
        <div className='img'>
            <img src={thumbnail} alt="name" style={imgStyle} />
        </div>
        <div className='personInfo'>
            <p className='name'>{name}</p>
            <p className='info'>{description}</p>
            <div className='sellectLink'>
                <a href={homepage} className='buttons homepage'>HOMEPAGE</a>
                <a href={wiki} className='buttons wiki'>WIKI</a>
            </div>
        </div>
    </div> : null
    return (
        <section className='randomCharPerson'>
            {errors}
            {spinner}
            {content}
            <div className='randomPersonToggle'>
                <p className='randomPersonTittle'>Random character for today! <br />Do you want to get to know him better?</p>
                <p className='randomPersonTittle'>Or choose another one</p>
                <button className='buttons try_it' disabled={loader} onClick={marvelsPersons}>TRY IT </button>
                <img src={mjolnir} alt="" />

            </div>
        </section>
    )

}

export default RandomCharPerson