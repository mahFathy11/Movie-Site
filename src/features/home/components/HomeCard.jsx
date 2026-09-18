import '../styles/homeCard.css'
import { useState } from 'react'

export default function HomeCard({
  title,
  imageUrl,
  mobileImageUrl,
  description,
  rating,
  releaseYear,
  genre,
  onMovieSelect,
  className = '',
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const hasLongDescription = description.length > 200
  const visibleDescription = isDescriptionExpanded || !hasLongDescription
    ? description
    : `${description.slice(0, 200)}...`

  return (
    <article className={className ? `home-card ${className}` : 'home-card'}>
      <div className="content">
        <h2>{title}</h2>

        <div className="movie-meta">
          {rating ? <span>★ {rating.toFixed(1)}</span> : null}
          {releaseYear ? <span>{releaseYear}</span> : null}
          <span>{genre}</span>
        </div>

        <p>{visibleDescription}</p>
        {hasLongDescription ? (
          <button
            className="read-more"
            type="button"
            onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
            aria-label={isDescriptionExpanded ? `Show less about ${title}` : `Read more about ${title}`}
            title={isDescriptionExpanded ? 'Show less' : 'Read more'}
          >
            {isDescriptionExpanded ? 'Show less' : 'Read more'}
          </button>
        ) : null}

        <div className="btns">
          <button type="button" className="info" aria-label={`View details for ${title}`} title="View details" onClick={() => onMovieSelect?.()}>
            View details
          </button>
        </div>
      </div>

      <div className="image">
        <div className="name">{title}</div>
        <picture>
          {mobileImageUrl ? <source media="(max-width: 700px)" srcSet={mobileImageUrl} /> : null}
          <img src={imageUrl} alt={title}  onClick={() => onMovieSelect?.()}/>
        </picture>
      </div>
    </article>
  )
}