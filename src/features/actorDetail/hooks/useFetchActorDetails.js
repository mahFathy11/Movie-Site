import { useCallback } from "react";
import { useFetchDetails } from "../../../hooks/useFetchDetails";
import { fetchActorDetails } from "../../../utils/FetchData";

export default function useFetchActorDetails(actorId) {
  const fetchDetails = useCallback(
    () => (actorId ? fetchActorDetails(actorId) : Promise.resolve(null)),
    [actorId],
  );

  return useFetchDetails(fetchDetails, actorId);
}
