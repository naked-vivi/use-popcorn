import { useState } from "react";
import MainPage from "./components/layout/MainPage";
import NavBar from "./components/layout/NavBar";
// import { tempMovieData } from "./data/movies";
import type { WatchedMovie } from "./types";
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
import { useMovie } from "./components/custom-hooks/useMovie";
import { useLocalStorageState } from "./components/custom-hooks/useLocalStorageState";

// const KEY = `1a6da5d7`

export default function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("")
  const [query, setQuery] = useState<string>("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { movies, isLoading, error } = useMovie(query)
  const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>([], "watched")

  function handleSelectMovie(id: string) {
    setSelectedId(selectedId => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter(movie => movie.imdbId !== id))
  }

  function handleQueryChange(query: string) {
    setQuery(query);
  }


  return (
    <>
      <NavBar>
        <Search query={query} setQuery={handleQueryChange} />
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
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}

            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </MainPage>
    </>
  );
}
