import { useEffect, useRef } from "react";

interface SearchProps {
    query: string
    setQuery: (query: string) => void
}

function Search({ query, setQuery }: SearchProps) {
    const inputEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function callback(e: KeyboardEvent) {
            if (document.activeElement === inputEl.current) return;

            if (e.code === 'Enter') {
                inputEl.current?.focus();
                setQuery("")
            }
        }

        document.addEventListener('keydown', callback)

        return () => document.removeEventListener('keydown', callback)
    }, [setQuery])

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search
