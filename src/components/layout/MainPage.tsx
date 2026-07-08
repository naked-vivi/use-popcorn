import MovieListBox from "../movies/MovieListBox";
import WatchedBox from "../watched/WatchedBox";
import type { Movie } from "../../types";

interface MainPageProps {
    movies: Movie[];
}

function MainPage({ movies }: MainPageProps) {
    return (
        <main className="main">
            <MovieListBox movies={movies} />
            <WatchedBox />
        </main>
    )
}

export default MainPage
