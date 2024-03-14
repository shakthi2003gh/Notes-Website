import NetworkProvider from "./network";
import ThemeProvider from "./theme";
import NotesProvider from "./notes";

export default function StateProvider({ children }) {
  return (
    <NetworkProvider>
      <ThemeProvider>
        <NotesProvider>{children}</NotesProvider>
      </ThemeProvider>
    </NetworkProvider>
  );
}
