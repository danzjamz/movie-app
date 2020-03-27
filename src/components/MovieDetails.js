import React from 'react';

const MovieDetails = ({ movie, removeMovie }) => {
    return (
        <li onClick={ () => removeMovie(movie.id) }>
            <div className='title'>{ movie.title }</div>
            <div className='title'>{ movie.genre }</div>
        </li>
    )
}

export default MovieDetails;