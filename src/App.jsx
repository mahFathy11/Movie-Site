import { createBrowserRouter, Outlet, RouterProvider, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import OnTv from './pages/OnTv'
import MovieDetails from './pages/MovieDetails'
import TvDetails from './pages/TvDetails'
import SearchResults from './pages/SearchResults'
import Actors from './pages/Actors'
import ActorDetails from './pages/ActorDetails'
import NotFound from './pages/NotFound'
import Favorites from './pages/Favorites'
import { MovieProvider } from './context/MovieProvider'
import { categoryPath, genres, movieCategories, tvCategories } from './config/navigation'
import useTheme from './hooks/useTheme'

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const { theme, toggleTheme } = useTheme()

  // Keep the search field in the layout so it survives route changes until an action resets it.
  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        onHomeClick={() => navigate('/')}
        onActorsClick={() => navigate('/actors')}
        onMoviesClick={() => navigate('/movies/now-playing')}
        onMovieCategoryClick={(category) => navigate(`/movies/${categoryPath(movieCategories, category)}`)}
        onTvClick={(category) => navigate(`/tv/${categoryPath(tvCategories, category)}`)}
        onGenreClick={(genre) => navigate(`/genres/${genre}`)}
        onFavoritesClick={() => navigate('/favorites')}
        theme={theme}
        onThemeToggle={toggleTheme}
        onSearch={(query) => {
          const normalizedQuery = query.trim()
          if (normalizedQuery) navigate(`/search?q=${encodeURIComponent(normalizedQuery)}`)
        }}
      />
      <div key={`${location.pathname}${location.search}`} className="page-transition">
        <Outlet context={{ setSearch }} />
      </div>
    </>
  )
}

function HomeRoute() {
  const navigate = useNavigate()
  return <Home onMovieSelect={(movie) => navigate(`/movie/${movie.id}`)} onViewAll={() => navigate('/movies/now-playing')} />
}

function MoviesRoute() {
  const navigate = useNavigate()
  const { category = 'now-playing' } = useParams()
  return <Movies key={category} initialCategory={movieCategories[category] || movieCategories['now-playing']} onMovieSelect={(movie) => navigate(`/movie/${movie.id}`)} />
}

function TvRoute() {
  const navigate = useNavigate()
  const { category = 'airing-today' } = useParams()
  return <OnTv key={category} initialCategory={tvCategories[category] || tvCategories['airing-today']} onTvSelect={(show) => navigate(`/tv-show/${show.id}`)} />
}

function GenreRoute() {
  const navigate = useNavigate()
  const { genre } = useParams()
  return <Movies key={genre} initialGenre={genres[genre] || null} onMovieSelect={(movie) => navigate(`/movie/${movie.id}`)} />
}

function ActorsRoute() {
  const navigate = useNavigate()
  return <Actors onActorSelect={(actor) => navigate(`/actors/${actor.id}`)} />
}

function FavoritesRoute() {
  const navigate = useNavigate()
  return <Favorites onMovieSelect={(movie) => navigate(`/movie/${movie.id}`)} />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: 'movies/:category', element: <MoviesRoute /> },
      { path: 'tv/:category', element: <TvRoute /> },
      { path: 'genres/:genre', element: <GenreRoute /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'tv-show/:id', element: <TvDetails /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'actors', element: <ActorsRoute /> },
      { path: 'actors/:id', element: <ActorDetails /> },
      { path: 'favorites', element: <FavoritesRoute /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  )
}
