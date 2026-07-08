import Logo from "../shared/Logo";
import Search from "../shared/Search";
import type { Movie } from "../../types";

interface NavBarProps {
    movies: Movie[];
}

function NavBar({ movies }: NavBarProps) {

    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    )
}

export default NavBar
