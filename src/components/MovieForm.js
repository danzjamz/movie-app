import React, { useState, useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';

const MovieForm = () => {
    const { movies, addMovie } = useContext(MovieContext)

    const [ title, setTitle ] = useState('');
    const [ genre, setGenre ] = useState('');

    const submitForm = (e) => {
        addMovie(title, genre)
        e.preventDefault();
        setTitle('');
        setGenre('');
    }

    return (
        <form onSubmit={ submitForm }>
            <input 
                type='text' 
                placeholder='Movie Title'
                value={ title }
                onChange={ (e) => setTitle(e.target.value) }
            />
            <input 
                type='text' 
                placeholder='Movie Genre'
                value={ genre }
                onChange={ (e) => setGenre(e.target.value) }
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default MovieForm;