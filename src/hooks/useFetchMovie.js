import {
  fetchDiscoverMovies,
  fetchDiscoverTv,
  fetchAiringTodayTv,
  fetchNowPlayingMovies,
  fetchOnTv,
  fetchPopularTv,
  fetchSearchMulti,
  fetchTopRatedTv,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../utils/FetchData";
import { useCallback } from "react";
import { useMovieList } from "./useMovieList";

const categoryFetchers = {
  "Now Playing": fetchNowPlayingMovies,
  Popular: fetchPopularMovies,
  Trending: fetchTrendingMovies,
  "Top Rated": fetchTopRatedMovies,
  Upcoming: fetchUpcomingMovies,
  "On TV": fetchOnTv,
  "Airing today": fetchAiringTodayTv,
  "TV Popular": fetchPopularTv,
  "TV Top Rated": fetchTopRatedTv,
};

// Selects the correct API request for lists, searches, or genres.
export default function useFetchMovie(
  category,
  value = null,
  page = 1,
  isTv = false,
  searchQuery = "",
) {
  const selectedFetch = useCallback(
    (requestedPage) => {
      if (searchQuery) {
        return fetchSearchMulti(requestedPage, searchQuery);
      }

      if (value) {
        const fetchDiscover = isTv ? fetchDiscoverTv : fetchDiscoverMovies;
        return fetchDiscover(requestedPage, { with_genres: value });
      }

      return (categoryFetchers[category] || fetchNowPlayingMovies)(
        requestedPage,
      );
    },
    [category, isTv, searchQuery, value],
  );

  return useMovieList(selectedFetch, page);
}
