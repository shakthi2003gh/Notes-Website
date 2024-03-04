import { createContext, useContext, useState } from "react";

const KEY = "Note-theme";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const InitialTheme = localStorage.getItem(KEY) || getSystemTheme();
const ThemeContext = createContext(InitialTheme);
document.body.setAttribute(InitialTheme, true);

export function useTheme() {
  const { theme, themeToggle } = useContext(ThemeContext);

  return { theme, isDarkTheme: theme === "dark", themeToggle };
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

  return (
    <ThemeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
