const favoritePrefix = "favorite-movie-";

export function isFavoriteMovie(movieId) {
  try {
    const movie = JSON.parse(
      localStorage.getItem(`${favoritePrefix}${movieId}`),
    );
    return Boolean(
      movie &&
      typeof movie === "object" &&
      movie.id &&
      (movie.title || movie.name),
    );
  } catch {
    return false;
  }
}

export function getFavoriteMovies() {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith(favoritePrefix))
    .map((key) => {
      try {
        const movie = JSON.parse(localStorage.getItem(key));
        return movie &&
          typeof movie === "object" &&
          movie.id &&
          (movie.title || movie.name)
          ? movie
          : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export function setFavoriteMovie(movie, isFavorite) {
  const key = `${favoritePrefix}${movie.id}`;

  if (isFavorite) {
    localStorage.setItem(key, JSON.stringify(movie));
  } else {
    localStorage.removeItem(key);
  }
}
