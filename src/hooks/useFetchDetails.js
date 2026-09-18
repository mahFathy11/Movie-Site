import { useEffect, useState } from "react";

// Manages the shared loading, error, retry, and unmount behavior for one detail request.
export function useFetchDetails(fetchDetails, id) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadDetails() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchDetails();
        if (isMounted) setDetails(data);
      } catch (requestError) {
        if (isMounted)
          setError(requestError.message || "Unable to load details right now.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [fetchDetails, id, retryKey]);

  return {
    details,
    isLoading,
    error,
    retry: () => setRetryKey((key) => key + 1),
  };
}
