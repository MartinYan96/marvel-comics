import { useHttp } from '../components/hooks/https.hooks';
import AvengersError from '../resources/img/AvengersError.webp'

const useMarvelService = () => {

    const { loader, error, request, clearError } = useHttp()

    const getAllPerson = async (offset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=2fe2037751b47438b15ee307bff6ce59`)
        return getAllPersons(res)
    }

    const getPerson = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=2fe2037751b47438b15ee307bff6ce59`)
        return getPersons(res)
    }

    const selectPerson = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=2fe2037751b47438b15ee307bff6ce59`)
        return getSearchs(res)
    }

    const totalNumber = async () => {
        return await request('https://gateway.marvel.com:443/v1/public/characters?apikey=2fe2037751b47438b15ee307bff6ce59')
        
    }

    const getComics = async (offset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?orderBy=modified&limit=8&offset=${offset}&apikey=2fe2037751b47438b15ee307bff6ce59`)
        return res.data.results.map(getComices)
    }

    const getComicById = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=2fe2037751b47438b15ee307bff6ce59`);
        return getComices(res.data.results[0]);
    };

    const getSearch = async (name) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=2fe2037751b47438b15ee307bff6ce59`)
        return getSearchs(res)
    }

    const getTotalComics = async () => {
        return await request(`https://gateway.marvel.com:443/v1/public/comics?apikey=2fe2037751b47438b15ee307bff6ce59`)
    }


    const getPersons = (res) => {
        const result = res.data.results[0]
        return {
            id: result.id,
            name: result.name,
            description: result.description === '' ? 'no description' : result.description,
            thumbnail: result.thumbnail.path + '.' + result.thumbnail.extension,
            homepage: result.urls[0].url,
            wiki: result.urls[1].url
        }
    }

    const getAllPersons = (res) => {
        return res.data.results.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description === '' ? 'no description' : item.description,
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                homepage: item.urls[0].url,
                wiki: item.urls[1].url,
                comics: item.comics.items,
                total: res.data.total
            }
        })
    }

    const getComices = (res) => {
        return {
            id: res.id,
            title: res.title,
            price: res.prices[0].price + '$',
            images: res.images[0] !== undefined ? res.images[0].path + '.' + res.images[0].extension : AvengersError,
            description: res.description || 'There is not description',
            languages: res.textObjects.language || 'en-us',
            pageCount: res.pageCount,
            result: res
        }

    }
    const getSearchs = (char) => {
        const charter = char.data.results[0]
        if (charter === undefined) {
            return true
        } else {
            return (
                {
                    id: charter.id,
                    name: charter.name,
                    images: charter.thumbnail.path + '.' + charter.thumbnail.extension || AvengersError,
                    description: charter.description || 'There is not description',
                }

            )
        }

    }

    return { loader, error, clearError, getAllPerson, getPerson, totalNumber, getComics, getSearch, selectPerson, getComicById, getTotalComics }
}
export default useMarvelService