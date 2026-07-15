import MovieItem from "./MovieItem";
import type { Movie } from "../../types";

interface MovieListProps {
    movies: Movie[];
    onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
            ))}
        </ul>
    )
}

export default MovieList
