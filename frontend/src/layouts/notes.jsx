import { RiFilePaper2Fill } from "react-icons/ri";
import { RiFilePaper2Line } from "react-icons/ri";
import { useTheme } from "../state/theme";
import { useNotes } from "../state/notes";
import Note from "../components/note";

import { TbReportOff } from "react-icons/tb";

export default function Notes() {
  const { isDarkTheme } = useTheme();
  const { notes, search, searchNotFound, isLoading } = useNotes();
  const maxHeight = `calc(${window.innerHeight}px - 55px)`;

  if (isLoading)
    return (
      <div className="notes container">
        <Note loading />
        <Note loading />
        <Note loading />
        <Note loading />
      </div>
    );

  if (searchNotFound)
    return (
      <div className="no-notes container" style={{ maxHeight }}>
        <TbReportOff />

        <p>
          Note with Title <b>"{search}"</b> not found
        </p>
      </div>
    );

  if (!notes.length)
    return (
      <div className="no-notes container" style={{ maxHeight }}>
        {isDarkTheme ? <RiFilePaper2Fill /> : <RiFilePaper2Line />}

        <p>Notes you add appear here.</p>
      </div>
    );

  return (
    <div className="notes container">
      {notes.map(({ _id, ...rest }) => (
        <Note key={_id} _id={_id} {...rest} />
      ))}
    </div>
  );
}
