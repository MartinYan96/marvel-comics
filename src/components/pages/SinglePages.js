import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import useMarvelService from "../../services/MarvelService";
import ServicesError from "../../services/ServicesError";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import AppBaner from "../appBaner/AppBaner";

const SinglePages = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loader, error, selectPerson, clearError, getComicById } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comics':
                getComicById(id)
                    .then(onDataLoaded);
                break;
            case 'characters':
                selectPerson(id)
                    .then(onDataLoaded);
                    break
            default: return 
        }
    }
    console.log(id)

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ServicesError /> : null;
    const spinner = loader ? <LoadingSpinner /> : null;
    const content = !(loader || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBaner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePages