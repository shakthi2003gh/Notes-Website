import React, { useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useNotes } from "../state/notes";

export default function SearchBar() {
  const inputRef = useRef();
  const { search, setSearch } = useNotes();

  const handleType = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = (e) => {
    const { code, type } = e;

    const isMouseClick = type === "click";
    const isEscapeKey = type === "keyup" && code === "Escape";

    if (!(isMouseClick || isEscapeKey)) return;

    !!search.length && setSearch("");
    inputRef.current.focus();
  };

  return (
    <div className="search-bar">
      <IoIosSearch />

      <input
        ref={inputRef}
        type="text"
        name="search"
        value={search}
        onChange={handleType}
        placeholder="Search..."
        onKeyUp={handleClear}
      />

      {!!search.length && (
        <button onClick={handleClear}>
          <IoIosClose />
        </button>
      )}
    </div>
  );
}
