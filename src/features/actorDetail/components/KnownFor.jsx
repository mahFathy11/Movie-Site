import MovieCard from '../../../components/MovieCard'
import '../styles/knownFor.css'

export default function KnownFor({ credits, onMovieSelect }) {
  return (
    <section className="known-for">
      <h2>Known for</h2>
      {credits.length ? (
        <div className="known-for-list">
          {credits.map((movie) => (
            <MovieCard key={`${movie.media_type}-${movie.id}`} movie={movie} onSelect={onMovieSelect} />
          ))}
        </div>
      ) : <p className="actor-details-empty">No known credits are available.</p>}
    </section>
  )
}
