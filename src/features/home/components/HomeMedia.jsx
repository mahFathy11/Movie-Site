import '../styles/homeMedia.css'
import MovieCard from '../../../components/MovieCard'
import LoadMoreButton from '../../../components/LoadMoreButton'
import BackToTopButton from '../../../components/BackToTopButton'
import SectionState from '../../../components/SectionState'
import useFetchMovie from '../../../hooks/useFetchMovie'

export default function HomeMedia({ onMovieSelect, onViewAll }) {
  const {
    movies,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreError,
    retry,
    loadMore,
  } = useFetchMovie("Top Rated")

  // Handle the first request before rendering the section.
  if (isLoading) return <SectionState type="loading" />
  if (error) return <SectionState type="error" message={error} onRetry={retry} />

  return (
    <section className="home-media">
      <div className="title">
        <h2>Top Rated</h2>
        <button className="view" type="button" onClick={onViewAll}>View All</button>
      </div>
      
      <div className="movie-cards">
        {movies.length
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />)
          : <p className="empty-state">No movies found.</p>}
      </div>

      {loadMoreError ? (
        <p className="load-more-error" role="alert">
          {loadMoreError}
        </p>
      ) : null}
      
      <LoadMoreButton hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />

      <BackToTopButton />
    </section>
  )
}
