import WatchedItem from "./WatchedItem";
import type { WatchedMovie } from "../../types";

interface WatchedListProps {
    watched: WatchedMovie[];
    onDeleteWatched: (id: string) => void;
}

function WatchedList({ watched, onDeleteWatched }: WatchedListProps) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedItem key={movie.imdbId} movie={movie} onDeleteWatched={onDeleteWatched} />
            ))}
        </ul>
    )
}

export default WatchedList
