import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getFavoriteMovies } from '../utils/favoriteStorage'
import '../styling/favorites.css'

export default function Favorites({ onMovieSelect }) {
  const [favoriteMovies, setFavoriteMovies] = useState(() => getFavoriteMovies())

  const removeFavorite = (movie) => {
    setFavoriteMovies((currentMovies) => (
      currentMovies.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
    ))
  }

  return (
    <main className="favorites-page">
      <div className="favorites-heading">
        <h1>Favorite movies</h1>
        <span>{favoriteMovies.length}</span>
      </div>

      {favoriteMovies.length ? (
        <div className="favorites-grid">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onMovieSelect}
              onFavoriteChange={(isFavorite) => {
                if (!isFavorite) removeFavorite(movie)
              }}
            />
          ))}
        </div>
      ) : (
        <section className="favorites-empty">
          <span className="empty-heart" aria-hidden="true">♡</span>
          <h2>No favorite movies yet</h2>
          <p>Tap the heart on any movie to save it here.</p>
        </section>
      )}
    </main>
  )
}
