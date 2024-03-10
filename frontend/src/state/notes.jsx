import { createContext, useContext, useEffect, useState } from "react";
import { NotesLocalDB } from "../services/indexedDB";

const NoteContext = createContext(null);
const notesLocalDB = new NotesLocalDB();

export function useNotes() {
  return useContext(NoteContext);
}

export default function NotesProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const createNote = ({ title, text }) => {
    if (!title.trim() && !text.trim()) return;

    const id = Date.now();
    const newNote = { id, title, text };

    notesLocalDB.add(newNote);
    setNotes((prev) => [...prev, newNote]);
    return id;
  };

  const editNote = (note) => {
    notesLocalDB.update(note);
    setNotes((notes) => notes.map((n) => (n.id === note.id ? note : n)));
  };

  const deleteNote = (note_id) => {
    notesLocalDB.delete(note_id);
    setNotes((notes) => notes.filter((n) => n.id !== note_id));
  };

  useEffect(() => {
    const t = setTimeout(() => {
      notesLocalDB
        .getAll()
        .then(setNotes)
        .finally(() => setLoading(false));
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const searchFilter = (n) =>
    n.title.toLowerCase()?.includes(search.toLowerCase());

  const displayNotes = notes.filter(searchFilter);
  const searchNotFound = !!search.length && !displayNotes.length;

  const v1 = { isLoading, notes: displayNotes, searchNotFound };
  const v2 = { createNote, editNote, deleteNote };
  const v3 = { search, setSearch };
  const value = { ...v1, ...v2, ...v3 };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
