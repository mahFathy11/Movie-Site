const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const posterFallback =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="342" height="513" viewBox="0 0 342 513"%3E%3Crect width="342" height="513" fill="%23152433"/%3E%3Ctext x="171" y="257" fill="%238a99a8" font-family="Arial" font-size="20" text-anchor="middle"%3ENo poster%3C/text%3E%3C/svg%3E';

export function getTmdbImageUrl(path, size, fallback = "") {
  return path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : fallback;
}

export function getPosterUrl(path) {
  return getTmdbImageUrl(path, "w500", posterFallback);
}

export function getBackdropUrl(path) {
  return getTmdbImageUrl(path, "w1280");
}

export function getProfileUrl(path, size = "w342") {
  return getTmdbImageUrl(path, size);
}

export function getCompanyLogoUrl(path) {
  return getTmdbImageUrl(path, "w92");
}
