import useFetchActorDetails from '../features/actorDetail/hooks/useFetchActorDetails'
import { useNavigate, useParams } from 'react-router-dom'
import ActorHero from '../features/actorDetail/components/ActorHero'
import KnownFor from '../features/actorDetail/components/KnownFor'
import '../features/actorDetail/styles/actorDetails.css'

export default function ActorDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { details, isLoading, error } = useFetchActorDetails(id)

  if (error) return <main className="actor-details-state">{error}</main>
  if (isLoading || !details) return <main className="actor-details-state">Loading actor details...</main>

  const credits = (details.combined_credits?.cast || [])
    .filter((item) => ['movie', 'tv'].includes(item.media_type) && item.poster_path)
    .sort((first, second) => (second.vote_average || 0) - (first.vote_average || 0))
    .slice(0, 10)

  return (
    <main className="actor-details-page">
      <ActorHero actor={details} onBack={() => navigate(-1)} />
      <KnownFor
        credits={credits}
        onMovieSelect={(item) => navigate(`/${item.media_type === 'tv' ? 'tv-show' : 'movie'}/${item.id}`)}
      />
    </main>
  )
}
