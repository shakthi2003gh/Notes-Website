import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user";

const KEY = "Note-theme";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const InitialTheme = localStorage.getItem(KEY) || getSystemTheme();
const ThemeContext = createContext(InitialTheme);
document.body.setAttribute(InitialTheme, true);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(InitialTheme);
  const { user, setDarkMode } = useUser();
  const { darkMode } = user?.settings || {};

  const themeToggle = () => {
    setTheme((prev) => {
      const currentTheme = prev === "light" ? "dark" : "light";

      localStorage.setItem(KEY, currentTheme);
      document.body.removeAttribute(prev);
      document.body.setAttribute(currentTheme, true);

      return currentTheme;
    });

    setDarkMode(theme !== "dark");
  };

  useEffect(() => {
    if (!user) return;

    const currentTheme = darkMode ? "dark" : "light";
    if (currentTheme !== theme) themeToggle();
  }, [darkMode]);

  const value = { theme, isDarkTheme: theme === "dark", themeToggle };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
