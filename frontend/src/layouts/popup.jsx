import { createContext, useContext, useEffect, useState } from "react";

const PopupContext = createContext(null);

export function usePopup() {
  const { display, close } = useContext(PopupContext);

  return { display, close };
}

export default function Popup({ children }) {
  const [show, setShow] = useState(false);
  const [component, setComponent] = useState(null);

  const display = (component) => {
    setShow(true);
    setComponent(component);
  };

  const close = () => {
    setShow(false);
    setComponent(null);
  };

  const handleBlur = (e) => {
    if (e?.target?.classList?.contains("popup")) close();
  };

  const listener = (e) => {
    if (e.key === "Escape" && (() => show)) close();
  };

  useEffect(() => {
    window.addEventListener("keyup", listener);

    return () => window.removeEventListener("keyup", listener);
  }, []);

  const value = { display, close };

  return (
    <PopupContext.Provider value={value}>
      {children}
      {show && (
        <div className="popup" onClick={handleBlur}>
          {component}
        </div>
      )}
    </PopupContext.Provider>
  );
}
