import { useCallback } from 'react'
import { Navigate, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import SearchResultCard from '../features/movies/components/SearchResultCard'
import LoadMoreButton from '../components/LoadMoreButton'
import SectionState from '../components/SectionState'
import { useMovieList } from '../hooks/useMovieList'
import { fetchSearchMulti } from '../utils/FetchData'
import '../features/movies/styles/movieGrid.css'
import '../features/movies/styles/searchResults.css'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setSearch } = useOutletContext()
  const query = searchParams.get('q') || ''
  const fetchResults = useCallback((page) => fetchSearchMulti(page, query), [query])
  const {
    movies: results,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreError,
    retry,
    loadMore,
  } = useMovieList(fetchResults)

  // Search text is reset by result interactions or by navbar navigation, not route effects.
  if (!query) {
    return <Navigate to="/" replace />
  }

  if (isLoading) return <SectionState type="loading" />
  if (error) return <SectionState type="error" message={error} onRetry={retry} />

  const handleResultSelect = (result) => {
    setSearch('')
    if (result.media_type === 'person') navigate(`/actors/${result.id}`)
    else if (result.media_type === 'tv') navigate(`/tv-show/${result.id}`)
    else navigate(`/movie/${result.id}`)
  }

  return (
    <section className="movie-grid search-results" onClick={() => setSearch('')}>
      <div className="title"><h2>Search results for "{query}"</h2></div>
      <div className="movie-cards search-result-cards">
        {results.length ? results.map((result) => (
          <SearchResultCard key={`${result.media_type}-${result.id}`} result={result} onSelect={handleResultSelect} />
        )) : <p className="empty-state">No results found.</p>}
      </div>
      {loadMoreError ? <p className="load-more-error" role="alert">{loadMoreError}</p> : null}
      {results.length ? <LoadMoreButton hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} /> : null}
    </section>
  )
}
