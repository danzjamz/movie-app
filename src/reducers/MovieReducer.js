// This app rebuilt with reducers!!!

// # Lets create some reducers and actions
// - We can create a bunch of actions
// - We can then build a dispatch function that sends that action to the reducer function
// - Inside the reducer function it checks the type and based on that type it runs that logic
//   - For instance if its a add action it will update that state with a new item
//   - For instance if its a delete action it will update the state with that item gone
// - We can add all of our actions into a reducer function
// - We then have a dispatch to an action to the reducer and do whatever that action is
// ​
// ​
// ​
// ​
// ​
// # Lets first make a folder called reducers and create a file called movieReducer.js
// # Lets have it do all the actions we had before like addMovie and removeMovie
// ```javascript
// import { v4 as uuidv4 } from 'uuid';
// ​
// export const movieReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_MOVIE':
//             return [
//                 ...state,
//                 {
//                     title: action.movie.title,
//                     genre: action.movie.genre,
//                     id: uuidv4()
//                 }
//             ]
//         case 'REMOVE_MOVIE':
//             return state.filter((movie) => movie.id !== action.id)
//         default:
//             return state
//     }
// }
// ```
// ​
// ​
// ​
// ​
// # Lets update our MovieContext to use that reducer
// # userReducer takes the reducer as the first argument and the initial value of state as the second argument
// ```javascript
// import React, { createContext, useReducer } from 'react';
// import { movieReducer } from '../reducers/movieReducer';
// ​
// export const MovieContext = createContext()
// ​
// const MovieContextProvider = (props) => {
//     const [movies, dispatch] = useReducer(movieReducer, [])
//     return (
//         <MovieContext.Provider value={{movies, dispatch}}>
//             {props.children}
//         </MovieContext.Provider>
//     );
// }
 
// export default MovieContextProvider;
// ```
// ​
// ​
// ​
// ​
// # Lets update our MovieForm to use the dispatch instead of the addBook function we had from before
// # When we call that dispatch we need to pass in an action and a payload
// ```javascript
// import React, { useContext, useState } from 'react';
// import { MovieContext } from '../contexts/MovieContext';
// ​
// const MovieForm = () => {
//     const { dispatch } = useContext(MovieContext)
//     const [title, setTitle] = useState('')
//     const [genre, setGenre] = useState('')
// ​
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch({
//             type: 'ADD_MOVIE',
//             movie: {
//                 title: title,
//                 genre: genre
//             }
//         })
//         setTitle('')
//         setGenre('')
//     }
//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Movie Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Genre"
//                 value={genre}
//                 onChange={(e) => setGenre(e.target.value)}
//             />
//             <input type="submit" value="Add Movie"/>
//         </form>
//     );
// }
 
// export default MovieForm;
// ```
// ​
// ​
// ​
// ​
// # Lets also update our MovieDetails to use the dispatch instead of the removeBook function we had from before
// # When we call that dispatch we need to pass in an action and a payload
// ```javascript
// import React, { useContext } from 'react';
// import { MovieContext } from '../contexts/MovieContext'
// ​
// const MovieDetails = ({ movie }) => {
//     const { dispatch } = useContext(MovieContext)
//     return (
//         <li onClick={() => dispatch({ type: "REMOVE_MOVIE", id: movie.id})}>
//             <div className="title">{movie.title}</div>
//             <div className="genre">{movie.genre}</div>
//         </li>
//     );
// }
 
// export default MovieDetails;
// ```
// ​
// ​
// ​
// ​
// # You might get a question about multiple dispatch
// - The dispatch name doesn't have to be called dispatch.  You could do movieDispatch.
// - I have also seen people use dispatches like this.  Need to refactor the moviecontext and movieform
// > MovieContext.js
// ```javascript
// import React, { createContext, useReducer } from 'react';
// import { movieReducer } from '../reducers/movieReducer';
// ​
// export const MovieContext = createContext()
// ​
// const MovieContextProvider = (props) => {
//     const [movies, dispatch] = useReducer(movieReducer, [])
// ​
//     function addMovie(title, genre) {
//         dispatch({
//             type: 'ADD_MOVIE',
//             movie: {
//                 title: title,
//                 genre: genre
//             }
//         })
//     }
//     return (
//         <MovieContext.Provider value={{movies, dispatch, addMovie}}>
//             {props.children}
//         </MovieContext.Provider>
//     );
// }
 
// export default MovieContextProvider;
// ```
// ​
// > MovieForm.js
// ```javascript
// import React, { useContext, useState } from 'react';
// import { MovieContext } from '../contexts/MovieContext';
// ​
// const MovieForm = () => {
//     const { addMovie } = useContext(MovieContext)
//     const [title, setTitle] = useState('')
//     const [genre, setGenre] = useState('')
// ​
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         addMovie(title, genre)
//         setTitle('')
//         setGenre('')
//     }
//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Movie Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Genre"
//                 value={genre}
//                 onChange={(e) => setGenre(e.target.value)}
//             />
//             <input type="submit" value="Add Movie"/>
//         </form>
//     );
// }
 
// export default MovieForm;
// ```
// - I'm not sure which way is best practice.
// ​
// ​
// ​
// ​
// # Local Storage With Reducer
// - If you didn't review localstorage review it here
// ```javascript
// localStorage
// localStorage.setItem('movies', JSON.stringify([{ title: 'Movie One', id: 1 }]))
// localStorage
// localStorage.getItem('movies')
// JSON.parse(localStorage.getItem('movies'))
// ```
// ​
// ​
// ​
// ​
// # Lets use the useEffect hook to add to the localstorage when the movies array gets updated
// ```javascript
// import React, { createContext, useReducer, useEffect } from 'react';
// import { movieReducer } from '../reducers/movieReducer';
// ​
// export const MovieContext = createContext()
// ​
// const MovieContextProvider = (props) => {
//     const [movies, dispatch] = useReducer(movieReducer, [])
// ​
//     useEffect(() => {
//         localStorage.setItem('movies', JSON.stringify(movies))
//     }, [movies])
// ​
//     return (
//         <MovieContext.Provider value={{movies, dispatch}}>
//             {props.children}
//         </MovieContext.Provider>
//     );
// }
 
// export default MovieContextProvider;
// ```
// ​
// ​
// ​
// ​
// # Multiple ways to work through getting the localstorage.
// # First way would be good so they know useReducer has a third option that is a function
// ```javascript
// import React, { createContext, useReducer, useEffect } from 'react';
// import { movieReducer } from '../reducers/movieReducer';
// ​
// export const MovieContext = createContext()
// ​
// const MovieContextProvider = (props) => {
//     const [movies, dispatch] = useReducer(movieReducer, [], () => {
//         const localStorageMovies = localStorage.getItem('movies')
//         return localStorageMovies ? JSON.parse(localStorageMovies) : []
//     })
// ​
//     useEffect(() => {
//         localStorage.setItem('movies', JSON.stringify(movies))
//     }, [movies])
// ​
//     return (
//         <MovieContext.Provider value={{movies, dispatch}}>
//             {props.children}
//         </MovieContext.Provider>
//     );
// }
 
// export default MovieContextProvider;
// ```
// ​
// > Optional way
// ```javascript
// import React, { createContext, useReducer, useEffect } from 'react';
// import { movieReducer } from '../reducers/movieReducer';
// ​
// export const MovieContext = createContext()
// ​
// const localStorageMovies = JSON.parse(localStorage.getItem('movies'))
// ​
// const MovieContextProvider = (props) => {
//     const [movies, dispatch] = useReducer(movieReducer, localStorageMovies || [])
// ​
//     useEffect(() => {
//         localStorage.setItem('movies', JSON.stringify(movies))
//     }, [movies])
// ​
//     return (
//         <MovieContext.Provider value={{movies, dispatch}}>
//             {props.children}
//         </MovieContext.Provider>
//     );
// }
 
// export default MovieContextProvider;
