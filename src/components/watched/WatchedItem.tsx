import type { WatchedMovie } from "../../types"

interface WatchedItemProps {
    movie: WatchedMovie;
    onDeleteWatched: (id: string) => void;
}

function WatchedItem({ movie, onDeleteWatched }: WatchedItemProps) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime.toFixed(2)} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbId)}
                >
                    X
                </button>
            </div>
        </li>
    )
}

export default WatchedItem
