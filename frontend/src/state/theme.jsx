import { createContext, useContext, useState } from "react";

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

  const themeToggle = () => {
    setTheme((prev) => {
      const curentTheme = prev === "light" ? "dark" : "light";

      localStorage.setItem(KEY, curentTheme);
      document.body.removeAttribute(prev);
      document.body.setAttribute(curentTheme, true);

      return curentTheme;
    });
  };

  const value = { theme, isDarkTheme: theme === "dark", themeToggle };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
