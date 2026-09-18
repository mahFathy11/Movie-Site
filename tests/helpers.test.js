import test from "node:test";
import assert from "node:assert/strict";
import {
  categoryPath,
  genres,
  movieCategories,
} from "../src/config/navigation.js";
import {
  getCompanyLogoUrl,
  getPosterUrl,
  getProfileUrl,
} from "../src/utils/imageHelpers.js";
import {
  formatEpisodeRuntime,
  formatRuntime,
  getDirector,
  getTrailer,
} from "../src/features/movieDetail/helpers/detailsHelpers.js";

test("categoryPath resolves menu labels to route segments", () => {
  assert.equal(categoryPath(movieCategories, "Top Rated"), "top-rated");
  assert.equal(categoryPath(genres, "missing"), "action");
});

test("image helpers build TMDB URLs and fall back safely", () => {
  assert.equal(
    getPosterUrl("/poster.jpg"),
    "https://image.tmdb.org/t/p/w500/poster.jpg",
  );
  assert.equal(
    getProfileUrl("/person.jpg", "h632"),
    "https://image.tmdb.org/t/p/h632/person.jpg",
  );
  assert.equal(
    getCompanyLogoUrl("/logo.png"),
    "https://image.tmdb.org/t/p/w92/logo.png",
  );
  assert.match(getPosterUrl(""), /No poster/);
});

test("detail helpers normalize movie and TV metadata", () => {
  const details = {
    videos: { results: [{ site: "YouTube", type: "Trailer", key: "abc" }] },
    credits: { crew: [{ job: "Director", name: "Director Name" }] },
    created_by: [{ name: "Creator Name" }],
  };

  assert.equal(getTrailer(details).key, "abc");
  assert.equal(getDirector(details).name, "Director Name");
  assert.equal(getDirector(details, true).name, "Creator Name");
  assert.equal(formatRuntime(125), "2h 5m");
  assert.equal(formatEpisodeRuntime([45]), "45m per episode");
});
