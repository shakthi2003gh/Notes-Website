import { RiFilePaper2Fill } from "react-icons/ri";
import { RiFilePaper2Line } from "react-icons/ri";
import { useTheme } from "../state/theme";
import { useNotes } from "../state/notes";
import Note from "../components/note";

export default function Notes() {
  const { isDarkTheme } = useTheme();
  const { notes, isLoading } = useNotes();

  if (isLoading)
    return (
      <div className="notes container">
        <Note loading />
        <Note loading />
        <Note loading />
        <Note loading />
      </div>
    );

  if (!notes.length) {
    const maxHeight = `calc(${window.innerHeight}px - 55px)`;

    return (
      <div className="no-notes container" style={{ maxHeight }}>
        {isDarkTheme ? <RiFilePaper2Fill /> : <RiFilePaper2Line />}

        <p>Notes you add appear here.</p>
      </div>
    );
  }

  return (
    <div className="notes container">
      {notes.map(({ id, ...rest }) => (
        <Note key={id} id={id} {...rest} />
      ))}
    </div>
  );
}
