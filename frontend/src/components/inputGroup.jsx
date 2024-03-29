import { forwardRef, useId } from "react";

function InputGroup({ label, ...rest }, ref) {
  const id = useId();

  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}

      <input ref={ref} id={id} name={label} {...rest} autoComplete="on" />
    </div>
  );
}

export default forwardRef(InputGroup);
