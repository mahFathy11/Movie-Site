import { useState } from 'react'
import MovieToolbar from '../features/movies/components/MovieToolbar'
import MovieGrid from '../features/movies/components/MovieGrid'

export default function Movies({ onMovieSelect, onSearchResultClick, initialCategory = 'Now Playing', initialGenre = null, isTv = false, searchQuery = '' }) {
  const [category, setCategory] = useState(initialCategory)
  const [genreId, setGenreId] = useState(initialGenre)

  const isSearchPage = Boolean(searchQuery)

  return (
    <div className={isSearchPage ? 'movies search-page' : 'movies'}>

      {searchQuery ? null : (
        <MovieToolbar
          selectedCategory={category}
          onCategoryChange={setCategory}
          selectedGenre={genreId}
          onGenreChange={setGenreId}
          categories={isTv ? ['Airing today', 'On TV', 'TV Popular', 'TV Top Rated'] : ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']}
        />
      )}

      <MovieGrid
        category={searchQuery ? 'Search results' : category}
        genreId={genreId}
        onMovieSelect={onMovieSelect}
        onSearchResultClick={onSearchResultClick}
        isTv={isTv}
        searchQuery={searchQuery}
      />
    </div>
  )
}
