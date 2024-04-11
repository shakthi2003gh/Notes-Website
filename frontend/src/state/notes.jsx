import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user";
import IndexedDB from "../services/indexedDB";
import { create, getNote, update, sync, Delete } from "../services/http/notes";
import { useDebounceFn } from "../hooks/useDebounce";

const NoteContext = createContext(null);
const notesLocalDB = new IndexedDB("notes");
const initialDeleteIDs = localStorage.getItem("deleteIDs") || [];

export function useNotes() {
  return useContext(NoteContext);
}

export default function NotesProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [deletedIDs, setDeletedIDs] = useState(initialDeleteIDs);
  const [search, setSearch] = useState("");
  const { canSync, setSyncing } = useUser();

  const createNote = ({ title, text, ...rest }) => {
    if (!title.trim() && !text.trim()) return;

    const _id = Date.now().toString();
    const newNote = { _id, title, text, ...rest };

    notesLocalDB.add(newNote);
    setNotes((prev) => [...prev, newNote]);
    return _id;
  };

  const editNote = (note) => {
    notesLocalDB.update(note);
    setNotes((notes) => notes.map((n) => (n._id === note._id ? note : n)));
  };

  const deleteNote = (note_id) => {
    notesLocalDB.delete(note_id);
    setNotes((notes) => notes.filter((n) => n._id !== note_id));

    if (Number(note_id)) return;
    setDeletedIDs((prev) => {
      const ids = [...prev, note_id];

      localStorage.setItem("deleteIDs", ids);
      return ids;
    });
  };

  const syncNotes = () => {
    setSyncing(true);

    function localSync(id) {
      return ({ id: newID, lastSync }) => {
        setNotes((prev) => {
          const index = prev.findIndex(({ _id }) => _id === id);

          if (index === -1) return prev;
          prev[index].lastSync = lastSync;

          if (!newID) return prev;
          prev[index]._id = newID;

          notesLocalDB.add(prev[index]);
          notesLocalDB.delete(id);

          return prev;
        });
      };
    }

    function deleteSync(id) {
      return () => {
        setDeletedIDs((prev) => {
          const ids = prev.filter((_id) => _id !== id);

          localStorage.setItem("deleteIDs", ids);
          return ids;
        });
      };
    }

    sync()
      .then((storedNotes) => {
        if (!storedNotes) return null;

        const local = storedNotes.map(({ _id: id, lastSync }) => {
          const index = notes.findIndex(({ _id }) => _id === id);
          const isDeleted = deletedIDs.includes(id);

          if (isDeleted) return Delete(id).then(deleteSync(id));
          if (index < 0) return getNote(id).then((note) => createNote(note));
          if (notes[index].lastSync >= lastSync) return null;
          return getNote(id).then((note) => editNote(note));
        });

        const cloud = notes.map(({ _id: id, lastSync, ...rest }) => {
          const note = { _id: id, lastSync, ...rest };
          const index = storedNotes.findIndex(({ _id }) => _id === id);
          const isDeleted = index < 0 && !Number(id);

          if (isDeleted) return deleteNote(id);
          if (index < 0) return create({ ...rest }).then(localSync(id));
          if (storedNotes[index].lastSync >= lastSync) return null;
          return update(id, note).then(localSync(id));
        });

        return Promise.all([local, cloud]);
      })
      .finally(() => setSyncing(false));
  };

  const handleSync = useDebounceFn(syncNotes, 2500);

  useEffect(() => {
    notesLocalDB
      .getAll()
      .then(setNotes)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    canSync && handleSync();
  }, [canSync, notes]);

  const searchFilter = (n) =>
    n.title.toLowerCase()?.includes(search.toLowerCase());

  const displayNotes = notes.filter(searchFilter);
  const searchNotFound = !!search.length && !displayNotes.length;

  const v1 = { isLoading, notes: displayNotes, searchNotFound };
  const v2 = { createNote, editNote, deleteNote, syncNotes };
  const v3 = { search, setSearch };
  const value = { ...v1, ...v2, ...v3 };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
