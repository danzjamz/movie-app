import React, { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';

const Navbar = () => {
    const { movies } = useContext(MovieContext)

    return (
        <div className='navbar'>
            <h1>Movie List</h1>
            <p>Currently you have { movies.length } movies to watch</p>
        </div>
    )
}

export default Navbar;