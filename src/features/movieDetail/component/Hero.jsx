import '../styles/hero.css'

import { useEffect, useState } from 'react'
import { getBackdropUrl } from '../../../utils/imageHelpers'
import { isFavoriteMovie, setFavoriteMovie } from '../../../utils/favoriteStorage'

export default function Hero({ formatRuntime, details, posterUrl, posterFallback, onBack, mediaType = 'Movie' }) {
  const backdropUrl = getBackdropUrl(details.backdrop_path)
  const title = details.title || details.name
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A'
  const [isFavorite, setIsFavorite] = useState(() => isFavoriteMovie(details?.id))

  useEffect(() => {
    setIsFavorite(isFavoriteMovie(details?.id))
  }, [details?.id])

  const handleFavoriteToggle = () => {
    const nextFavorite = !isFavorite
    setIsFavorite(nextFavorite)
    setFavoriteMovie(details, nextFavorite)
  }

  return (
    <section className="details-hero">
      {backdropUrl ? (
        <img className="details-backdrop" src={backdropUrl} alt="" aria-hidden="true" />
      ) : null}
      <div className="details-hero-overlay" aria-hidden="true" />

      <button className="details-back" type="button" onClick={onBack} aria-label="Back to movies" title="Back to movies">
        <span aria-hidden="true">←</span>
      </button>

      <button
        type="button"
        className={`details-favorite ${isFavorite ? 'is-favorite' : ''}`}
        aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
        aria-pressed={isFavorite}
        onClick={handleFavoriteToggle}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <div className="details-overview">
        <img
          className="details-poster"
          src={posterUrl}
          alt={`${title} poster`}
          onError={(event) => {
            event.currentTarget.src = posterFallback
          }}
        />

        <div className="details-content">
          <div className="details-title-row">
            <h1>{title}</h1>
            <span className="details-media-type">{mediaType}</span>
            <span className="details-rating">★ {rating} / 10</span>
          </div>

          <div className="details-meta">
            <span>{(details.release_date || details.first_air_date)?.slice(0, 4) || 'Year unavailable'}</span>
            <span>{formatRuntime(details.runtime)}</span>
            <span>{details.original_language?.toUpperCase() || 'Language unavailable'}</span>
          </div>

          <div className="details-genres">
            {details.genres?.map((genre) => <span key={genre.id}>{genre.name}</span>)}
          </div>

          <p className="details-overview-text">{details.overview || 'No overview is available for this movie.'}</p>
        </div>
      </div>
    </section>
  )
}
