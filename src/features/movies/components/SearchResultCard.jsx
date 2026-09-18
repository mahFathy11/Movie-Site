import MovieCard from '../../../components/MovieCard'
import { getProfileUrl } from '../../../utils/imageHelpers'

export default function SearchResultCard({ result, onSelect }) {
  if (result.media_type === 'person') {
    return (
      <button className="search-person-card" type="button" onClick={() => onSelect(result)}>
        {result.profile_path ? (
          <img src={getProfileUrl(result.profile_path)} alt={result.name} loading="lazy" />
        ) : (
          <span className="search-person-placeholder" aria-hidden="true" />
        )}
        <strong>{result.name}</strong>
        <span>Actor</span>
      </button>
    )
  }

  return <MovieCard movie={result} onSelect={() => onSelect(result)} />
}
