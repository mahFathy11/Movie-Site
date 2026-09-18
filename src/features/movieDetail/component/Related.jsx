import MovieCard from '../../../components/MovieCard'
import '../styles/related.css'

export default function Related({ similarMovies, onMovieSelect }) {
  const movies = similarMovies || []

  return (
    <section className="related">
      <h2>More like this</h2>
      {movies.length ? (
        <div className="related-list">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />)}
        </div>
      ) : (
        <p className="details-empty">No related movies are available.</p>
      )}
    </section>
  )
}
