
import type { Movie } from "../../types";

interface MovieItemProps {
    movie: Movie;
    onSelectMovie: (id: string) => void;
}

function MovieItem({ movie, onSelectMovie }: MovieItemProps) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)} >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

export default MovieItem
