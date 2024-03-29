import NetworkProvider from "./network";
import UserProvider from "./user";
import NotesProvider from "./notes";
import ThemeProvider from "./theme";

export default function StateProvider({ children }) {
  return (
    <NetworkProvider>
      <UserProvider>
        <NotesProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NotesProvider>
      </UserProvider>
    </NetworkProvider>
  );
}
