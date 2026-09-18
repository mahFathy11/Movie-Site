import '../styles/hero.css'
import HomeCard from './HomeCard'
import HeroControls from './HeroControls'
import HeroIndicators from './HeroIndicators'
import SectionState from '../../../components/SectionState'
import useFetchMovie from '../../../hooks/useFetchMovie'
import { useMovieContext } from '../../../context/useMovieContext'
import useHeroCarousel from '../hooks/useHeroCarousel'
import { getMobileImageUrl, getPosterUrl, getReleaseYear } from '../helpers/heroHelpers'

const MAX_DISPLAYED_MOVIES = 5

// Composes the data, carousel behavior, and visual sections of the hero.
export default function HomeHero({ onMovieSelect }) {
  const { movies: topRatedMovies, isLoading, error, retry } = useFetchMovie('Top Rated')
  const { getMovieGenres } = useMovieContext()

  const displayedMovies = topRatedMovies.slice(0, MAX_DISPLAYED_MOVIES)

  const carousel = useHeroCarousel(displayedMovies.length)

  if (isLoading) return <SectionState type="loading" />
  if (error) return <SectionState type="error" message={error} onRetry={retry} />
  if (!displayedMovies.length) return null

  return (
    <section className="home-hero" aria-label="Trending movies">
      <div
        className="cards"
        onMouseEnter={() => carousel.setIsPaused(true)}
        onMouseLeave={() => carousel.setIsPaused(false)}
        onPointerDown={carousel.handlePointerDown}
        onPointerUp={carousel.handlePointerUp}
      >
        {displayedMovies.map((movie, index) => (
          <HomeCard
            key={movie?.id || `fallback-${index}`}
            className={carousel.getCardClass(index)}
            title={movie?.title || movie?.name}
            imageUrl={getPosterUrl(movie)}
            mobileImageUrl={getMobileImageUrl(movie)}
            description={movie?.overview || 'No overview is available for this movie.'}
            rating={movie?.vote_average}
            releaseYear={getReleaseYear(movie)}
            genre={getMovieGenres(movie)}
            onMovieSelect={() => onMovieSelect?.(movie)}
          />
        ))}

        <HeroControls
          onPrevious={() => carousel.moveTo(-1)}
          onNext={() => carousel.moveTo(1)}
        />
      </div>
      <HeroIndicators
        movies={displayedMovies}
        activeIndex={carousel.activeIndex}
        onSelect={carousel.select}
      />
    </section>
  )
}
