import { useCallback } from "react";
import { fetchMovieDetails, fetchTvDetails } from "../utils/FetchData";
import { useFetchDetails } from "./useFetchDetails";

// Loads one movie or TV detail record through the shared request state.
export default function useFetchMovieDetails(id, isTv = false) {
  const fetchDetails = useCallback(
    () =>
      id
        ? isTv
          ? fetchTvDetails(id)
          : fetchMovieDetails(id)
        : Promise.resolve(null),
    [id, isTv],
  );

  return useFetchDetails(fetchDetails, id);
}
