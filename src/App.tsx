import { useState } from "react";
import MainPage from "./components/layout/MainPage";
import NavBar from "./components/layout/NavBar";
import { tempMovieData } from "./data/movies";
import type { Movie } from "./types";
import NumResult from "./components/shared/NumResult";
import Search from "./components/shared/Search";

export default function App() {
  const [movies] = useState<Movie[]>(tempMovieData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <MainPage movies={movies} />
    </>
  );
}
