import { useEffect, useState } from "react";
import StarRating from "../shared/StarRating";
import Loader from "../shared/Loader";
import type { WatchedMovie } from "../../types";
import type { MovieDetailsData } from "../../types";

interface MovieDetailsProp {
    selectedId: string;
    onCloseMovie: () => void;
    onAddWatched: (movie: WatchedMovie) => void;
    watched: WatchedMovie[];
}

const KEY = `1a6da5d7`

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }: MovieDetailsProp) {
    const [movie, setMovie] = useState<MovieDetailsData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState(0)

    const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId)
    const watchedUserRating = watched.find((movie) => movie.imdbId === selectedId)?.userRating;

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true)
            const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json()
            setMovie(data)
            setIsLoading(false)
        }
        getMovieDetails();
    }, [selectedId])

    useEffect(() => {
        if (!movie) return;
        document.title = `Movie | ${movie.Title}`;

        return () => {
            document.title = "usePopcorn"
        }
    }, [movie])

    useEffect(() => {
        function callback(e: KeyboardEvent) {
            if (e.code === 'Escape') {
                onCloseMovie();
            }
        }

        document.addEventListener('keydown', callback)

        return () => {
            document.removeEventListener('keydown', callback)
        }
    }, [onCloseMovie])

    if (!movie) return <p className="loader">Loading...</p>

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        }
        onAddWatched(newWatchedMovie)
        onCloseMovie();
    }

    return (
        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}  &bull; {year}</p>
                            <p>{genre}</p>
                            <div>
                                <span>⭐️</span>
                                <span>{imdbRating} IMDb rating</span>
                            </div>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? <>< StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                                {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to List</button>}</>
                                :
                                <p>You rated with movie {watchedUserRating} <span>⭐️</span></p>
                            }

                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    )
}

export default MovieDetails
