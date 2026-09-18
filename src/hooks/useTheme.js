import { useEffect, useState } from "react";

const themeStorageKey = "movies-app-theme";

export default function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(themeStorageKey) || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
