import '../styles/cast.css'
import { getProfileUrl } from '../../../utils/imageHelpers'

export default function Cast({ cast, director, onActorSelect }) {
    return(
        <section className="top-cast">
            <h2>Top cast</h2>
            
            {cast?.length ? (
              <div className="cast-list">
                {cast.map((person) => (
                    <button className="cast-card" type="button" key={person.cast_id || person.id} onClick={() => onActorSelect?.(person)}>
                        {person.profile_path ? (
                            <img src={getProfileUrl(person.profile_path, 'w185')} alt={person.name} />
                        ) : (
                            <div className="cast-image-placeholder" aria-hidden="true" />
                        )}
                        <strong>{person.name}</strong>
                        <span>{person.character || 'Cast'}</span>
                    </button>
                ))}
              </div>
            ) : (
              <p className="details-empty">No cast information is available.</p>
            )}

                        {director ? (
                            <p className="director-credit">
                                <strong>Director</strong>
                                <span>{director.name}</span>
                            </p>
                        ) : null}
        </section>
    )
}
