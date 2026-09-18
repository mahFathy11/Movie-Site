import { createContext } from "react";

// Shared movie metadata and formatting helpers used across movie cards and heroes.
export const MovieContext = createContext(null);

export const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function getMovieGenres(movie, limit = 2) {
  // Convert TMDB genre IDs into a short display string for cards.
  return (
    movie?.genre_ids
      ?.map((genreId) => genreNames[genreId])
      .filter(Boolean)
      .slice(0, limit)
      .join(" / ") || "Movie"
  );
}
