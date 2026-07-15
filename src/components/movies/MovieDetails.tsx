import { useEffect, useState } from "react";

interface MovieDetailsProp {
    selectedId: string;
    onCloseMovie: () => void;
}

interface MovieDetailsData {
    Title: string;
    Year: string;
    Poster: string;
    Runtime: string;
    imdbRating: string;
    Plot: string;
    Released: string;
    Actors: string;
    Director: string;
    Genre: string;
}

const KEY = `1a6da5d7`

function MovieDetails({ selectedId, onCloseMovie }: MovieDetailsProp) {
    const [movie, setMovie] = useState<MovieDetailsData | null>(null)

    useEffect(() => {
        async function getMovieDetails() {
            setMovie(null)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json()
            setMovie(data)
        }
        getMovieDetails();
    }, [selectedId])

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

    return (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onCloseMovie}>
                    &larr;
                </button>
                <img src={poster} alt={`Poster of ${title} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐️</span>
                        {imdbRating} IMDb rating
                    </p>
                </div>
            </header>
            <section>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
                <p>Released in {year}</p>
            </section>
        </div>
    )
}

export default MovieDetails
