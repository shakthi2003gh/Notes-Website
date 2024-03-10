import { useEffect, useRef } from "react";
import { IoMdTrash } from "react-icons/io";
import { useNotes } from "../state/notes";
import { usePopup } from "../layouts/popup";

export default function Note({ id, title, text, expand, loading }) {
  const idRef = useRef(id || "");
  const titleRef = useRef();
  const textRef = useRef();
  const { display, close } = usePopup();
  const { createNote, editNote, deleteNote } = useNotes();

  const handleChange = () => {
    const id = idRef.current;
    const note = { title: titleRef.current.value, text: textRef.current.value };

    if (id) return editNote({ id, ...note });
    idRef.current = createNote(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    id && deleteNote(id);
    expand && close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleExpand = (e) => {
    if (expand) return;

    const { code, type } = e;
    const note = { id, title, text };
    const enterKeycodes = ["Enter", "NumpadEnter"];

    const isMouseClick = type === "click";
    const isEnterKey = type === "keyup" && enterKeycodes.includes(code);

    if (!(isMouseClick || isEnterKey)) return;
    display(<Note {...note} expand />);
  };

  const handleTextareaHeight = () => {
    const textarea = textRef.current;
    textRef.current.style.height = "60px";
    textRef.current.style.overflowY = "hidden";

    const scrollHeight = textarea.scrollHeight;
    textRef.current.style.height = scrollHeight + "px";

    if (scrollHeight > 300) textRef.current.style.overflowY = "auto";
  };

  useEffect(() => {
    if (expand) handleTextareaHeight();
  }, [expand]);

  if (loading)
    return (
      <div className="note-loading">
        <div className="title"></div>

        <div className="para">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    );

  return (
    <div
      className={"note" + (expand ? " expanded" : "")}
      tabIndex={0}
      onClick={handleExpand}
      onKeyUp={handleExpand}
    >
      {expand ? (
        <form name="note" onChange={handleChange} onSubmit={handleSubmit}>
          <input
            ref={titleRef}
            type="text"
            name="title"
            className="note__title"
            defaultValue={title}
            placeholder="Title"
            autoFocus
          />
          <textarea
            ref={textRef}
            name="text"
            className="note__text"
            defaultValue={text}
            placeholder="Take a note..."
            onChange={handleTextareaHeight}
          ></textarea>

          <div className="buttons">
            <button type="button" className="btn btn--primary" onClick={close}>
              Close
            </button>

            {id && (
              <button type="button" className="trash" onClick={handleDelete}>
                <IoMdTrash />
              </button>
            )}
          </div>
        </form>
      ) : !title && !text ? (
        <div className="empty-note">
          <span>Empty Note</span>

          <button className="trash" onClick={handleDelete}>
            <IoMdTrash />
          </button>
        </div>
      ) : (
        <>
          <div className={"note__title" + (!title ? " empty" : "")}>
            {title || "No Title"}
          </div>
          <pre className={"note__text strink" + (!text ? " empty" : "")}>
            {text || "No Notes"}
          </pre>
        </>
      )}
    </div>
  );
}
