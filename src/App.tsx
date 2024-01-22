import { useState, useEffect} from 'react';
import endpointsConfig from './env/endpoints.config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieSearchList from './components/MovieSearchList';
import MovieSearchListHeader from './components/MovieSearchListHeader';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

function App() {

      const [movies, setMovies] = useState<Movie[]>([]);
      const [searchValue, setSearchValue] = useState<string>('');
      const [favourites, setFavourites] = useState<Movie[]>([]);

      useEffect(() => {
            const movieFavourites = localStorage.getItem('react-movie-app-favourites');

            if (movieFavourites) {
                const parsedFavourites = JSON.parse(movieFavourites);
                setFavourites(parsedFavourites);
            }
      }, []);

      const saveToLocalStorage = (items: any) => {
            localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
      }

      const addFavouriteMovie = (movie: Movie) => {
        const isMovieAlreadyAdded = favourites.some((favMovie) => favMovie.imdbID === movie.imdbID);

        if (!isMovieAlreadyAdded) {
          const newFavouriteList = [...favourites, movie];
          setFavourites(newFavouriteList);
          saveToLocalStorage(newFavouriteList);
        }
      };

      const removeFromFavourites = (movie: Movie) => {
            const newFavouriteList = favourites.filter(
                (favourite) => favourite.imdbID !== movie.imdbID
            );

            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
      }

      useEffect(() => {
          async function fetchMovies() {
              const response = await fetch(
                `${endpointsConfig.API_URL}?s=${searchValue}&apikey=${endpointsConfig.API_KEY}`
              );

              const moviesData = await response.json();
              setMovies(moviesData.Search || []);
          }

          fetchMovies();
      }, [searchValue])

    return (
        <div className='container-fluid movie-search-app'>
            <div className='row d-flex align-itens-center mt-4 mb-4'>
                <MovieSearchListHeader heading='Movies'/>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className='row'>
                <MovieSearchList
                    movies={movies}
                    favouriteComponent={AddFavourite}
                    handleFavouritesClick={addFavouriteMovie}
                />
            </div>
            <div className='row d-flex align-itens-center mt-4 mb-4'>
                <MovieSearchListHeader heading='Favourites'/>
            </div>
            <div className='row'>
                 <MovieSearchList
                    movies={favourites}
                    favouriteComponent={RemoveFavourites}
                    handleFavouritesClick={removeFromFavourites}
                />
            </div>
        </div>
  );
}

export default App;