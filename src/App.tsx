import { useState } from "react";
import MainPage from "./components/layout/MainPage";
import NavBar from "./components/layout/NavBar";
import { tempMovieData } from "./data/movies";
import type { Movie, WatchedMovie } from "./types";
import NumResult from "./components/shared/NumResult";
import Search from "./components/shared/Search";
import Box from "./components/shared/Box";
import MovieList from "./components/movies/MovieList";
import WatchedList from "./components/watched/WatchedList";
import WatchedSummary from "./components/watched/WatchedSummary";
import { tempWatchedData } from "./data/watched";
import StarRating from "./components/shared/StarRating";

export default function App() {
  const [movies] = useState<Movie[]>(tempMovieData);
  const [watched] = useState<WatchedMovie[]>(tempWatchedData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResult movies={movies} />
      </NavBar>

      <StarRating maxRating={5} />

      <MainPage>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </MainPage>
    </>
  );
}
