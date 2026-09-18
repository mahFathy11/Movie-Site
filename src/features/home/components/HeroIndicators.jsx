// Renders the pagination dots and marks the active movie.
export default function HeroIndicators({ movies, activeIndex, onSelect }) {
  return (
    <div className="dots" aria-label="Choose a movie">
      {movies.map((movie, index) => (
        <button
          key={movie?.id || `dot-${index}`}
          type="button"
          className={`dot ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
          aria-label={`Go to movie ${index + 1}`}
          title={`Go to movie ${index + 1}`}
        />
      ))}
    </div>
  )
}
