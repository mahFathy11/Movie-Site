import HomeHero from '../features/home/components/HomeHero'
import HomeMedia from '../features/home/components/HomeMedia'

export default function Home({ onMovieSelect, onViewAll }) {
  return (
    <main>
      <HomeHero onMovieSelect={onMovieSelect} />
      <HomeMedia onMovieSelect={onMovieSelect} onViewAll={onViewAll} />
    </main>
  )
}