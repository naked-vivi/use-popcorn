import { useState } from "react";
import MainPage from "./components/layout/MainPage";
import NavBar from "./components/layout/NavBar";
import { tempMovieData } from "./data/movies";
import type { Movie } from "./types";

export default function App() {
  const [movies] = useState<Movie[]>(tempMovieData);

  return (
    <>
      <NavBar movies={movies} />
      <MainPage movies={movies} />
    </>
  );
}
