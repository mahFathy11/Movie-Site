import { useContext } from "react";
import { MovieContext } from "./MovieContext";

export function useMovieContext() {
  const context = useContext(MovieContext);

  // Fail early when a component is rendered outside the provider boundary.
  if (!context) {
    throw new Error("useMovieContext must be used inside MovieProvider");
  }

  return context;
}
