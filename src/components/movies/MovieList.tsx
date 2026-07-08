import MovieItem from "./MovieItem";
import type { Movie } from "../../types";

interface MovieListProps {
    movies: Movie[];
}

function MovieList({ movies }: MovieListProps) {
    return (
        <ul className="list">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default MovieList
