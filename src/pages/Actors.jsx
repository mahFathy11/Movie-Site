import useFetchActors from '../features/actors/hooks/useFetchActors'
import '../styling/actors.css'
import { getProfileUrl } from '../utils/imageHelpers'

export default function Actors({ onActorSelect }) {
  const { movies: actors, isLoading, error, retry } = useFetchActors()
  const displayedActors = actors.filter((actor) => actor.gender === 2).slice(0, 10)

  return (
    <main className="actors-page">
      <h1>Trending actors</h1>

      {isLoading ? (
        <div className="actors-grid" aria-label="Loading actors">
          {Array.from({ length: 10 }, (_, index) => <div className="actor-skeleton" key={index} />)}
        </div>

      ) : error ? (
        <div className="actors-state" role="alert">
          <p>{error}</p>
          <button type="button" onClick={retry}>Try again</button>
        </div>

      ) : displayedActors.length ? (
        <div className="actors-grid">
          {displayedActors.map((actor) => (
            <button className="actor-card" type="button" key={actor.id} onClick={() => onActorSelect?.(actor)}>
              {actor.profile_path ? (
                <img src={getProfileUrl(actor.profile_path)} alt={actor.name} loading="lazy" />
              ) : (
                <div className="actor-image-placeholder" aria-hidden="true" />
              )}
              <h2>{actor.name}</h2>
            </button>
          ))}
        </div>
      ) : (
        <p className="actors-state">No trending actors are available right now.</p>
      )}
    </main>
  )
}
