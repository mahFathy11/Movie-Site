import '../styles/actorHero.css'
import { getProfileUrl } from '../../../utils/imageHelpers'

export default function ActorHero({ actor, onBack }) {
  const gender = actor.gender === 1 ? 'Female' : actor.gender === 2 ? 'Male' : 'Not specified'

  return (
    <section className="actor-hero">
      <button className="actor-back" type="button" onClick={onBack} aria-label="Back to actors">←</button>

      {actor.profile_path ? (
        <img className="actor-profile" src={getProfileUrl(actor.profile_path, 'h632')} alt={actor.name} />
      ) : (
        <div className="actor-profile actor-profile-placeholder" aria-hidden="true" />
      )}
      
      <div className="actor-info">
        <h1>{actor.name}</h1>

        <p className="actor-popularity">Popularity ↑ {actor.popularity?.toFixed(1) || 'N/A'}</p>

        <dl className="actor-facts">
          <div><dt>Gender</dt><dd>{gender}</dd></div>
          <div><dt>Birthday</dt><dd>{actor.birthday || 'Not available'}</dd></div>
          <div><dt>Deathday</dt><dd>{actor.deathday || 'Still living'}</dd></div>
          <div><dt>Place of birth</dt><dd>{actor.place_of_birth || 'Not available'}</dd></div>
          <div><dt>IMDb</dt><dd>{actor.imdb_id ? <a href={`https://www.imdb.com/name/${actor.imdb_id}`} target="_blank" rel="noreferrer">View profile ↗</a> : 'Not available'}</dd></div>
        </dl>
        
        <p className="actor-biography">{actor.biography || 'No biography is available for this actor yet.'}</p>
      </div>
    </section>
  )
}
