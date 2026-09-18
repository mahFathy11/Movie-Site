import { getPosterUrl as getSharedPosterUrl } from "../../../utils/imageHelpers.js";

export function formatRuntime(minutes) {
  return minutes
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : "Runtime unavailable";
}

export function formatEpisodeRuntime(runtime) {
  const minutes = runtime?.[0];
  return minutes ? `${minutes}m per episode` : "Runtime unavailable";
}

export function getPosterUrl(details) {
  return getSharedPosterUrl(details.poster_path);
}

export function getTrailer(details) {
  return details.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
}

export function getCast(details) {
  return details.credits?.cast?.slice(0, 10) || [];
}

export function getDirector(details, isTv = false) {
  return isTv
    ? details.created_by?.[0]
    : details.credits?.crew?.find((person) => person.job === "Director");
}

export function getSimilar(details) {
  return details.similar?.results?.slice(0, 5) || [];
}
