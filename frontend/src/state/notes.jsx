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

  const value = { isLoading, notes, createNote, editNote, deleteNote };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
