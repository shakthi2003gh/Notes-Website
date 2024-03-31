import { useState } from "react";

export default function Toggle({ ON, height, gap, onToggle = () => {} }) {
  const [value, setValue] = useState(ON || false);
  const style = { "--height": height, "--gap": gap };

  const handleToggle = (e) => {
    setValue(e.target.checked);
    onToggle();
  };

  const handleKeyBoardToggle = (e) => {
    if (e.keyCode !== 13) return;

    setValue((prev) => !prev);
    onToggle();
  };

  return (
    <label
      className="toggle"
      tabIndex={0}
      onKeyDown={handleKeyBoardToggle}
      style={style}
    >
      <div className="nob"></div>
      <input
        name="toggle"
        type="checkbox"
        checked={value}
        onChange={handleToggle}
        hidden
      />
    </label>
  );
}
