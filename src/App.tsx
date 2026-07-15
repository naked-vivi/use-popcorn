import { useEffect, useState } from "react";
import MainPage from "./components/layout/MainPage";
import NavBar from "./components/layout/NavBar";
// import { tempMovieData } from "./data/movies";
import type { Movie, WatchedMovie } from "./types";
import NumResult from "./components/shared/NumResult";
import Search from "./components/shared/Search";
import Box from "./components/shared/Box";
import MovieList from "./components/movies/MovieList";
import WatchedList from "./components/watched/WatchedList";
import WatchedSummary from "./components/watched/WatchedSummary";
// import { tempWatchedData } from "./data/watched";
// import StarRating from "./components/shared/StarRating";
import Loader from "./components/shared/Loader";
import ErrorMessage from "./components/shared/ErrorMessage";
import MovieDetails from "./components/movies/MovieDetails";

const KEY = `1a6da5d7`

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched] = useState<WatchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [query, setQuery] = useState<string>("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('')

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.")

        const data = await res.json();

        if (data.Response === "False")
          throw new Error("Movie not found")

        setMovies(data.Search);
      }
      catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error("An unknown error occurred");
          setError("An unknown error occurred");
        }
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      {/* <StarRating maxRating={5} size={48} className="text-2xl" /> */}

      <MainPage>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </MainPage>
    </>
  );
}
