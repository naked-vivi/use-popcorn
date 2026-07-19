import { useEffect, useState } from "react";
import type { Movie } from "../../types";

const KEY = `1a6da5d7`

export function useMovie(query: string) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        // callback?.();
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('')

                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

                if (!res.ok)
                    throw new Error("Something went wrong with fetching movies.")

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("Movie not found")

                setMovies(data.Search);
                setError("")
            }
            catch (err) {
                if (err instanceof Error) {
                    if (err.name === "AbortError") return;

                    console.error(err.message);
                    setError(err.message);
                }
            }
            finally {
                setIsLoading(false);
            }
        }

        if (!query.trim()) {
            return;
        }

        fetchMovies();

        return () => {
            controller.abort()
        }
    }, [query]);

    return { movies, isLoading, error }

}

