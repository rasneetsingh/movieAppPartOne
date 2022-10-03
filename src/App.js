import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './Components/MovieList';
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";
import AddFavourites from "./Components/AddFavourites";
import RemoveFavourites from "./Components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async () => {
    
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ff5df0ea`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search);
    }

  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);


  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    
		
	};

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);

  };

  return (
    
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Movies'> </MovieListHeading>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
        </div>
        <div className='row'>
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites'>
            
          </MovieListHeading>
        </div>
        <div className='row'>
          <MovieList
            movies={favourites}
            handleFavouritesClick= {removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
            
            
          />
        </div>
      </div>
      
      
  );
}

export default App;
