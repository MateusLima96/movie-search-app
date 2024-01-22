import React from "react";
import { Movie } from "../App";

interface MovieSearchListProps {
    movies: Movie[];
    favouriteComponent: React.FC;
    handleFavouritesClick: (movie: Movie) => void;
}

const MovieSearchList: React.FC<MovieSearchListProps> = ({movies, favouriteComponent, handleFavouritesClick}) => {

    const FavouriteComponent = favouriteComponent;

    return (
        <>
            {movies.map((movie: Movie) => (
                <div className='image-container col-6 col-sm-2 col-md-3 col-lg-2 mb-3 mt-4' key={movie.imdbID}>
                    <img src={movie.Poster} alt={movie.Title}></img>
                    <div
                         className="overlay d-flex align-items-center justify-content-center"
                         onClick={() => handleFavouritesClick(movie)}
                    >
                        <FavouriteComponent/>
                    </div>
                </div>
             ))}
        </>
    )
}

export default MovieSearchList;