import type { Movie } from "../../types";

interface NumResultProps {
    movies: Movie[];
}

function NumResult({ movies }: NumResultProps) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

export default NumResult