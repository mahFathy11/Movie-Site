import '../styles/movieGrid.css'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../../../components/MovieCard'
import LoadMoreButton from '../../../components/LoadMoreButton'
import BackToTopButton from '../../../components/BackToTopButton'
import SectionState from '../../../components/SectionState'
import useFetchMovie from '../../../hooks/useFetchMovie'

export default function MovieGrid({ category, genreId, onMovieSelect, onSearchResultClick, isTv = false, searchQuery = '' }) {
  const navigate = useNavigate()
  const {
    movies,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreError,
    retry,
    loadMore,
  } = useFetchMovie(category, genreId, 1, isTv, searchQuery)

  // Handle the first request before rendering the section.
  if (isLoading) return <SectionState type="loading" />
  if (error) return <SectionState type="error" message={error} onRetry={retry} />

  const isSearchPage = Boolean(searchQuery)

  return (
    <section
      className={`movie-grid${isSearchPage ? ' search-results' : ''}`}
      onClick={isSearchPage ? onSearchResultClick : undefined}
    >
      <div className="title">
        <h2>{category}</h2>
      </div>
      
      <div className="movie-cards">
        {movies.length
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />)
          : (
            <div className="empty-state full-width-empty">
              <p>No movies found.</p>
              <button className="back-home-button" type="button" onClick={() => navigate('/')}>
                Back home
              </button>
            </div>
          )}
      </div>

      {loadMoreError ? (
        <p className="load-more-error" role="alert">
          {loadMoreError}
        </p>
      ) : null}
      
      {!movies.length ? null : <LoadMoreButton hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />}

      {movies.length ? <BackToTopButton /> : null}
    </section>
  )
}
