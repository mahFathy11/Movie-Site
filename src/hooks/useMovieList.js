import { useCallback, useEffect, useReducer } from "react";
import { initialMovieListState, movieListReducer } from "./movieListReducer";

export function useMovieList(fetchMovies, page = 1) {
  const [state, dispatch] = useReducer(movieListReducer, {
    ...initialMovieListState,
    currentPage: page,
  });

  useEffect(() => {
    // Ignore responses from requests that finished after the component unmounted.
    let isMounted = true;

    async function loadMovies() {
      dispatch({ type: "FETCH_START" });

      try {
        const data = await fetchMovies(page);

        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", data, page });
        }
      } catch (requestError) {
        if (isMounted) {
          dispatch({
            type: "FETCH_ERROR",
            message: requestError.message || "Unable to load movies right now.",
          });
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [fetchMovies, page, state.retryKey]);

  const loadMore = useCallback(async () => {
    if (state.isLoadingMore || state.currentPage >= state.totalPages) return;

    dispatch({ type: "LOAD_MORE_START" });

    try {
      // Append the next API page without replacing the current movies.
      const nextPage = state.currentPage + 1;
      const data = await fetchMovies(nextPage);

      dispatch({
        type: "LOAD_MORE_SUCCESS",
        data,
        page: nextPage,
      });
    } catch (requestError) {
      dispatch({
        type: "LOAD_MORE_ERROR",
        message: requestError.message || "Unable to load more movies.",
      });
    }
  }, [fetchMovies, state.currentPage, state.isLoadingMore, state.totalPages]);

  const retry = () => dispatch({ type: "RETRY" });

  return {
    movies: state.movies,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    hasMore: state.currentPage < state.totalPages,
    error: state.error,
    loadMoreError: state.loadMoreError,
    retry,
    loadMore,
  };
}
