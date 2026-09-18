export const initialMovieListState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: true,
  isLoadingMore: false,
  error: "",
  loadMoreError: "",
  retryKey: 0,
};

export function movieListReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: "", loadMoreError: "" };

    case "FETCH_SUCCESS":
      return {
        ...state,
        movies: Array.isArray(action.data.results) ? action.data.results : [],
        currentPage: action.page,
        totalPages: action.data.total_pages || 1,
        isLoading: false,
      };

    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.message };

    case "LOAD_MORE_START":
      return { ...state, isLoadingMore: true, loadMoreError: "" };

    case "LOAD_MORE_SUCCESS":
      return {
        ...state,
        movies: [...state.movies, ...(action.data.results || [])],
        currentPage: action.page,
        totalPages: action.data.total_pages || state.totalPages,
        isLoadingMore: false,
      };

    case "LOAD_MORE_ERROR":
      return { ...state, isLoadingMore: false, loadMoreError: action.message };

    case "RETRY":
      return { ...state, retryKey: state.retryKey + 1 };

    default:
      return state;
  }
}
