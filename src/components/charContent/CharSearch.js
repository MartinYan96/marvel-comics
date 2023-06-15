import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import useMarvelService from "../../services/MarvelService"
import './charSearch.scss'


const CharSearch = () => {
    const [char, setChar] = useState(null);

    const { getSearch, loader, error, clearError, selectPerson } = useMarvelService()


    const onCharLoaded = (char) => {
        setChar(char);

    }

    const updateChar = (name) => {
        clearError();
        getSearch(name).then(onCharLoaded);
    }


    const result = !char ?
        null :
        char !== null && char === true ?
            <div style={{ color: 'red', marginTop: 10 }}>the charachter was not found.Chack the name try again</div> :
            <div className='toPageVizit'>
                <div style={{ color: 'green', marginTop: 10 }}>There is! Visit {char.name} page</div>
                <Link to={`/characters/${char.id}`} className='buttons toPageButton'>To Page</Link>
            </div>

    return (
        <div className='charSearch'>
            <div className='charSearchBlok'>
                <p style={{ marginBottom: '10px' }}>Or find a character by name:</p>
                <Formik
                    initialValues={{
                        charName: ''
                    }}
                    validationSchema={Yup.object({
                        charName: Yup.string().required('This field is required')
                    })}
                    onSubmit={({ charName }) => {
                        updateChar(charName);
                    }}
                >

                    <Form className='form'>
                        <div className='search'>
                            <Field
                                type='text'
                                name='charName'
                                id='text'
                                placeholder='Enter name'
                            />

                            <button
                                type='submit'
                                className='buttons findCharacter'
                                disabled={loader}
                            > FIND </button>
                        </div>
                        <ErrorMessage component="div" className="charSearchError" name="charName" />
                    </Form>
                </Formik>
                {result}
            </div>
        </div>
    )
}

export default CharSearch