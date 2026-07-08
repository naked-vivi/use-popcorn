import { useState } from "react";
import { tempWatchedData } from "../../data/watched";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";
import type { WatchedMovie } from "../../types";

function WatchedBox() {
    const [isOpen2, setIsOpen2] = useState<boolean>(true);
    const [watched] = useState<WatchedMovie[]>(tempWatchedData);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummary watched={watched} />
                    <WatchedList watched={watched} />
                </>
            )}
        </div>
    )
}

export default WatchedBox
