import React, { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';
import MovieDetails from './MovieDetails';


const MovieList = () => {
    const { movies, removeMovie } = useContext(MovieContext);

    return (
        <div className='movie-list'>
            <ul>
                { movies.length ? (
                    movies.map(movie => {
                    return <MovieDetails movie={movie} removeMovie={ removeMovie } key={ movie.id} />
                }) ) : <p className='empty'>You have no movies yet!</p> }
            </ul>

        </div>
    )
}

export default MovieList;