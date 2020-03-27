import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const MovieContext = createContext();
const localStorageMovies = JSON.parse(localStorage.getItem('movies'));

const MovieContextProvider = (props) => {
    const [ movies, setMovies ] = useState(localStorageMovies || [ ]);

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies))
    }, [movies])

    const addMovie = (title, genre) => {
        setMovies([ ...movies, { title, genre, id: uuidv4() } ])
    }

    const removeMovie = (id) => {
        setMovies(movies.filter(movie => movie.id !== id))
    }

    return (
        <MovieContext.Provider value={{ movies, addMovie: addMovie, removeMovie: removeMovie }}>
            { props.children }
        </ MovieContext.Provider>
    )
}

export default MovieContextProvider;