import useFetchMovieDetails from '../hooks/useFetchMovieDetails'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsLayout from '../features/movieDetail/component/DetailsLayout'
import {
  formatRuntime,
  getCast,
  getDirector,
  getPosterUrl,
  getSimilar,
  getTrailer,
} from '../features/movieDetail/helpers/detailsHelpers'

export default function MovieDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { details, isLoading, error } = useFetchMovieDetails(id)

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/movies/now-playing')
  }

  if (!id) return null

  if (error) return <section className="movie-details-state">{error}</section>
  if (isLoading || !details) return <section className="movie-details-state">Loading movie details...</section>

  return (
    <DetailsLayout
      details={details}
      trailer={getTrailer(details)}
      cast={getCast(details)}
      director={getDirector(details)}
      similarItems={getSimilar(details)}
      formatRuntime={formatRuntime}
      mediaType="Movie"
      posterUrl={getPosterUrl(details)}
      onBack={handleBack}
      onActorSelect={(actor) => navigate(`/actors/${actor.id}`)}
      onRelatedSelect={(movie) => navigate(`/movie/${movie.id}`)}
    />
  )
}
