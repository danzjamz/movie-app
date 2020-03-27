import React from 'react';
import MovieContextProvider from './contexts/MovieContext';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';

function App() {
  return (
    <div className="App">
      <MovieContextProvider>
        <Navbar />
        <MovieForm />
        <MovieList />
      </MovieContextProvider>
    </div>
  );
}

export default App;
