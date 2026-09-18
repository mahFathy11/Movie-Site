import Hero from './Hero'
import Trailer from './Trailer'
import Cast from './Cast'
import Companies from './Companies'
import Related from './Related'
import '../styles/movieDetails.css'
import { posterFallback } from '../../../utils/imageHelpers'

// Shared layout for movie and TV detail pages.
export default function DetailsLayout({
  details,
  trailer,
  cast,
  director,
  similarItems,
  formatRuntime,
  mediaType,
  posterUrl,
  onBack,
  onActorSelect,
  onRelatedSelect,
}) {
  const title = details.title || details.name

  return (
    <main className="movie-details" aria-label={`${title} details`}>
      <Hero
        formatRuntime={formatRuntime}
        details={details}
        posterUrl={posterUrl}
        posterFallback={posterFallback}
        onBack={onBack}
        mediaType={mediaType}
      />
      <Trailer trailer={trailer} details={details} />
      <Cast cast={cast} director={director} onActorSelect={onActorSelect} />
      <Companies details={details} />
      <Related similarMovies={similarItems} onMovieSelect={onRelatedSelect} />
    </main>
  )
}
