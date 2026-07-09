

interface MainPageProps {
    children?: React.ReactNode;
}

function MainPage({ children }: MainPageProps) {
    return (
        <main className="main">
            {children}
        </main>
    )
}

export default MainPage
