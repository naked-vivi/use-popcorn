import Logo from "../shared/Logo";

interface NavBarProps {
    children: React.ReactNode;
}

function NavBar({ children }: React.PropsWithChildren<NavBarProps>) {

    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    )
}

export default NavBar
