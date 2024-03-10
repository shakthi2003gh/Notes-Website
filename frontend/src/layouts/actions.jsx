import React from "react";
import { usePopup } from "./popup";
import Note from "../components/note";
import SearchBar from "../components/searchBar";

export default function Actions() {
  const { display } = usePopup();

  const handleClick = () => {
    display(<Note expand />);
  };

  return (
    <div className="actions container">
      <SearchBar />

      <button className="btn btn--primary" onClick={handleClick}>
        Create
      </button>
    </div>
  );
}
