import WatchedItem from "./WatchedItem";
import type { WatchedMovie } from "../../types";

interface WatchedListProps {
    watched: WatchedMovie[];
}

function WatchedList({ watched }: WatchedListProps) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedItem key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default WatchedList
