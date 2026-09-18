import '../styling/MovieCard.css'
import { useState } from 'react'
import { useMovieContext } from '../context/useMovieContext'
import { isFavoriteMovie, setFavoriteMovie } from '../utils/favoriteStorage'

export default function MovieCard({ movie, onSelect, onFavoriteChange }) {
  const { getMovieGenres } = useMovieContext()
  const [isFavorite, setIsFavorite] = useState(() => isFavoriteMovie(movie?.id))

  const title = movie?.title || movie?.name || 'Untitled movie'
  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'
  const releaseYear = (movie?.release_date || movie?.first_air_date)?.slice(0, 4) || 'Unknown year'
  const genre = getMovieGenres(movie, 1)

  return (
    <article
      className="movie-card"
      onClick={() => onSelect?.(movie)}
      onKeyDown={(event) => {
        if (onSelect && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onSelect(movie)
        }
      }}
    >
      <div className="image">
        <img src={imageUrl} alt={title} loading="lazy" />
        <h3>{title}</h3>

        <div className="card-actions">
          <button
            type="button"
            className="details-action"
            aria-label={`View details for ${title}`}
            onClick={(event) => {
              event.stopPropagation()
              onSelect?.(movie)
            }}
          >
            Details
          </button>
          <button
            type="button"
            className={`favorite-action ${isFavorite ? 'is-favorite' : ''}`}
            aria-label={
              isFavorite
                ? `Remove ${title} from favorites`
                : `Add ${title} to favorites`
            }
            aria-pressed={isFavorite}
            onClick={(event) => {
              event.stopPropagation()
              setIsFavorite((favorite) => {
                const nextFavorite = !favorite
                setFavoriteMovie(movie, nextFavorite)
                onFavoriteChange?.(nextFavorite)
                return nextFavorite
              })
            }}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        
      </div>
      <h4 className="card-title">{title}</h4>
      <div className="details">
        <div className="rating">★ {movie?.vote_average?.toFixed(1) || 'N/A'}</div>
        <span className="year">{releaseYear}</span>
        <span className="genre">{genre}</span>
      </div>
    </article>
  )
}
