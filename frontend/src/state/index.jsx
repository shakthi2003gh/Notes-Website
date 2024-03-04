import ThemeProvider from "./theme";

export default function StateProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
