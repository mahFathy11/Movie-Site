import '../styles/hero.css'

import { getBackdropUrl } from '../../../utils/imageHelpers'

export default function Hero({ formatRuntime, details, posterUrl, posterFallback, onBack, mediaType = 'Movie' }) {
  const backdropUrl = getBackdropUrl(details.backdrop_path)
  const title = details.title || details.name
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A'

  return (
    <section className="details-hero">
      {backdropUrl ? (
        <img className="details-backdrop" src={backdropUrl} alt="" aria-hidden="true" />
      ) : null}
      <div className="details-hero-overlay" aria-hidden="true" />

      <button className="details-back" type="button" onClick={onBack} aria-label="Back to movies" title="Back to movies">
        <span aria-hidden="true">←</span>
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
