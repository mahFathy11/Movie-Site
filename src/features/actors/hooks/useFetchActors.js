import { useCallback } from "react";
import { fetchTrendingPeople } from "../../../utils/FetchData";
import { useMovieList } from "./../../../hooks/useMovieList";

export default function useFetchActors() {
  const fetchActors = useCallback(async () => {
    const [firstPage, secondPage] = await Promise.all([
      fetchTrendingPeople(1),
      fetchTrendingPeople(2),
    ]);

    return {
      results: [...(firstPage.results || []), ...(secondPage.results || [])],
      total_pages: 1,
    };
  }, []);

  return useMovieList(fetchActors);
}
