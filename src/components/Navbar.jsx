import '../styling/navbar.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const getActiveNavItem = (pathname) => {
    const [section, category] = pathname.split('/').filter(Boolean)

    if (!section || section === 'home') return 'home'
    if (section === 'actors') return 'actors'
    if (section === 'movies' || section === 'movie') return category || 'movies'
    if (section === 'tv' || section === 'tv-show' || section === 'tv-shows') {
        if (!category) return 'tv-shows'

        const tvMap = {
            popular: 'tv-popular',
            'top-rated': 'tv-top-rated',
            'on-tv': 'on-tv',
            'airing-today': 'airing-today',
        }

        return tvMap[category] || 'tv-shows'
    }
    if (section === 'genres') return category || 'genres'
    return ''
}

// The navbar owns interaction state; navigation and search data come from the layout.
export default function Navbar({ search, setSearch, onHomeClick, onActorsClick, onMoviesClick, onMovieCategoryClick, onTvClick, onGenreClick, onFavoritesClick, onSearch, theme, onThemeToggle }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const { pathname } = useLocation()
    const activeNavItem = getActiveNavItem(pathname)

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown((currentDropdown) => (
            currentDropdown === dropdownName ? null : dropdownName
        ))
    }

    const selectNavItem = () => {
        setOpenDropdown(null)
    }

    const handleNavAction = (callback) => {
        // Leaving search results clears the lifted search value before navigation.
        setSearch('')
        selectNavItem()
        setIsMenuOpen(false)
        callback?.()
    }

    const movieDropdownItems = [
        { id: 'now-playing', label: 'Now playing', onSelect: () => onMovieCategoryClick?.('Now Playing') },
        { id: 'popular', label: 'Popular', onSelect: () => onMovieCategoryClick?.('Popular') },
        { id: 'top-rated', label: 'Top rated', onSelect: () => onMovieCategoryClick?.('Top Rated') },
        { id: 'upcoming', label: 'Upcoming', onSelect: () => onMovieCategoryClick?.('Upcoming') },
    ]

    const tvDropdownItems = [
        { id: 'airing-today', label: 'Airing today', onSelect: () => onTvClick?.('Airing today') },
        { id: 'on-tv', label: 'On TV', onSelect: () => onTvClick?.('On TV') },
        { id: 'tv-popular', label: 'Popular', onSelect: () => onTvClick?.('TV Popular') },
        { id: 'tv-top-rated', label: 'Top rated', onSelect: () => onTvClick?.('TV Top Rated') },
    ]

    const genreDropdownItems = [
        { id: 'action', label: 'Action', onSelect: () => onGenreClick?.('action') },
        { id: 'sci-fi', label: 'Sci-Fi', onSelect: () => onGenreClick?.('sci-fi') },
    ]

    return(
        <nav className={isMenuOpen ? 'menu-open' : ''}>
            <h2 onClick={() => {
                    handleNavAction(onHomeClick)
                }}>Movie Site</h2>
            <button
                className="menu-toggle"
                type="button"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((open) => !open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className="nav-links">
                <li><a id="/" className={activeNavItem === 'home' ? 'active' : ''} onClick={() => {
                    handleNavAction(onHomeClick)
                }}>Home</a></li>

                <li className={`dropdown ${openDropdown === 'movies' ? 'open' : ''}`}>
                    <a
                        id="/movies"
                        className={activeNavItem === 'movies' ? 'active' : ''}
                        aria-expanded={openDropdown === 'movies'}
                        onClick={() => {
                            setSearch('')
                            toggleDropdown('movies')
                            onMoviesClick?.()
                        }}
                    >
                        Movies
                    </a>
                    <ul>
                        {movieDropdownItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    id={`/movies/${item.id}`}
                                    className={activeNavItem === item.id ? 'active' : ''}
                                    onClick={() => {
                                        handleNavAction(item.onSelect)
                                    }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>

                <li><a id="/actors" className={activeNavItem === 'actors' ? 'active' : ''} onClick={() => {
                    handleNavAction(onActorsClick)
                }}>Actor</a></li>

                <li className={`dropdown ${openDropdown === 'tv-shows' ? 'open' : ''}`}>
                    <a
                        id="/tv-shows"
                        className={activeNavItem === 'tv-shows' ? 'active' : ''}
                        aria-expanded={openDropdown === 'tv-shows'}
                        onClick={() => {
                            handleNavAction(() => onTvClick?.('On TV'))
                        }}
                    >
                        Tv shows
                    </a>
                    <ul>
                        {tvDropdownItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    id={item.id}
                                    className={activeNavItem === item.id ? 'active' : ''}
                                    onClick={() => {
                                        handleNavAction(item.onSelect)
                                    }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className={`dropdown ${openDropdown === 'genres' ? 'open' : ''}`}>
                    <a
                        id="/genres"
                        className={activeNavItem === 'genres' ? 'active' : ''}
                        aria-expanded={openDropdown === 'genres'}
                        onClick={() => {
                            setSearch('')
                            toggleDropdown('genres')
                        }}
                    >
                        Genres
                    </a>
                    <ul>
                        {genreDropdownItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    id={item.id}
                                    className={activeNavItem === item.id ? 'active' : ''}
                                    onClick={() => {
                                        handleNavAction(item.onSelect)
                                    }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>

            <div className="navbar-actions">
                <button
                    className={`favorites-button ${pathname === '/favorites' ? 'active' : ''}`}
                    type="button"
                    aria-label="Open favorite movies"
                    title="Favorite movies"
                    aria-current={pathname === '/favorites' ? 'page' : undefined}
                    onClick={() => handleNavAction(onFavoritesClick)}
                >
                    <span aria-hidden="true">♥</span>
                </button>
                <button
                    className="theme-toggle"
                    type="button"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    onClick={onThemeToggle}
                >
                    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                </button>
                <div className="search-bar">
                    <input
                        type="search"
                        value={search}
                        placeholder="Search movies..."
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                const query = search.trim()
                                if (query) {
                                    onSearch?.(query)
                                }
                                setIsMenuOpen(false)
                            }
                        }}
                    />
                    <i className="fas fa-search"></i>
                </div>
            </div>
        </nav>
    )
}
