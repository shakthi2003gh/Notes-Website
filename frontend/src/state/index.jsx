import ThemeProvider from "./theme";
import NotesProvider from "./notes";

export default function StateProvider({ children }) {
  return (
    <ThemeProvider>
      <NotesProvider>{children}</NotesProvider>
    </ThemeProvider>
  );
}
