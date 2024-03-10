import React from "react";
import { usePopup } from "./popup";
import Note from "../components/note";

export default function Actions() {
  const { display } = usePopup();

  const handleClick = () => {
    display(<Note expand />);
  };

  return (
    <div className="actions container">
      <button className="btn btn--primary" onClick={handleClick}>
        Create
      </button>
    </div>
  );
}
