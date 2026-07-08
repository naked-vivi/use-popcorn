
import type { Movie } from "../../types";

interface MovieItemProps {
    movie: Movie;
}

function MovieItem({ movie }: MovieItemProps) {
    return (
        <li>
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
