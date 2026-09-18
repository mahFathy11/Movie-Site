import { getTmdbImageUrl } from "../../../utils/imageHelpers.js";

// Build the poster URL used by the desktop card image.
export function getPosterUrl(movie) {
  return getTmdbImageUrl(
    movie?.poster_path,
    "w500",
    "https://via.placeholder.com/500x750?text=No+Image",
  );
}

// Build the backdrop URL used by the mobile card image.
export function getMobileImageUrl(movie) {
  return getTmdbImageUrl(
    movie?.backdrop_path,
    "w780",
    "https://via.placeholder.com/1280x720?text=No+Image",
  );
}

// Extract a four-digit release year for the movie metadata.
export function getReleaseYear(movie) {
  return movie?.release_date?.slice(0, 4);
}
