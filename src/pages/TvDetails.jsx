import useFetchMovieDetails from '../hooks/useFetchMovieDetails'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsLayout from '../features/movieDetail/component/DetailsLayout'
import {
  formatEpisodeRuntime,
  getCast,
  getDirector,
  getPosterUrl,
  getSimilar,
  getTrailer,
} from '../features/movieDetail/helpers/detailsHelpers'

export default function TvDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { details, isLoading, error } = useFetchMovieDetails(id, true)

  if (!id) return null
  if (error) return <section className="movie-details-state">{error}</section>
  if (isLoading || !details) return <section className="movie-details-state">Loading TV details...</section>

  return (
    <DetailsLayout
      details={details}
      trailer={getTrailer(details)}
      cast={getCast(details)}
      director={getDirector(details, true)}
      similarItems={getSimilar(details)}
      formatRuntime={formatEpisodeRuntime}
      mediaType="TV Show"
      posterUrl={getPosterUrl(details)}
      onBack={() => navigate('/tv/on-tv')}
      onActorSelect={(actor) => navigate(`/actors/${actor.id}`)}
      onRelatedSelect={(show) => navigate(`/tv-show/${show.id}`)}
    />
  )
}
