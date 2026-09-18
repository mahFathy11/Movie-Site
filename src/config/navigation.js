export const movieCategories = {
  "now-playing": "Now Playing",
  popular: "Popular",
  "top-rated": "Top Rated",
  upcoming: "Upcoming",
};

export const tvCategories = {
  "airing-today": "Airing today",
  "on-tv": "On TV",
  popular: "TV Popular",
  "top-rated": "TV Top Rated",
};

export const genres = {
  action: "28",
  "sci-fi": "878",
};

export function categoryPath(categories, label) {
  return (
    Object.keys(categories).find((key) => categories[key] === label) ||
    Object.keys(categories)[0]
  );
}
