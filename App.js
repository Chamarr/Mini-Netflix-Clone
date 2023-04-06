import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

//abe3427a

const API_URL = 'https://www.omdbapi.com?apikey=abe3427a';


const App = () =>
{
    const [movies, setMovies] = useState([]);

    const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) =>
    {
        const response = await fetch(`${API_URL}&s=${title}`); //this pulls our api

        const data = await response.json(); //getting the data from the response

        setMovies(data.Search);
    }

    useEffect(() => 
    {
        searchMovies('Superman');
    }, []); //Empty dependency array
    return (
        <div className = "app">
            <h1>Movie Mania</h1>

            <div className = "search">
                <input
                    placeholder='Search for movies'
                    value= {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick = {() => searchMovies(searchTerm)}
                />
            </div>

            { //dynamically looping over the movies array which is returned from the API
                movies ?.length > 0
                    ? (
                        <div className = "container">
                            {movies.map((movie) => ( //taking each movie and passing it into the movie card function as a prompt
                                <MovieCard movie = {movie}/>
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;