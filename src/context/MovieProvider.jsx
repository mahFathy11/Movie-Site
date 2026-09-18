import { MovieContext, genreNames, getMovieGenres } from './MovieContext'

export function MovieProvider({ children }) {
  // Expose shared constants and helpers to every component inside the app.
  const value = { genreNames, getMovieGenres }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
