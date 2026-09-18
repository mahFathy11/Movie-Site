import '../styles/trailer.css'

// Displays the selected YouTube trailer or an empty state.
export default function Trailer({ trailer, details }) {
    return(
        <section className="details-section trailer-section">
            <h2>Trailer</h2>
            {trailer ? (
                <iframe 
                    className="trailer-player" 
                    src={`https://www.youtube-nocookie.com/embed/${trailer.key}`} 
                    title={`${details.title || details.name} trailer`} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                />
            ) : (
                <div className="trailer-empty details-empty">Trailer is not available.</div>
            )}
        </section>
    )
}
