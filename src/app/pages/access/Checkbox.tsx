import { useRef, useLayoutEffect } from "react";
import { status } from "./constants";

function Checkbox(props) {
  const { indeterminate, checked, id, compute, ...rest } = props;
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
      inputRef.current.checked = checked;
    }
  }, [indeterminate, checked]);

  return (
    <label className="control control-checkbox z-10 relative">
      <input
        {...rest}
        className="accent-green-500 w-5 h-5"
        ref={inputRef}
        type="checkbox"
        onChange={() => {
          const newStatus = inputRef.current.checked
            ? status.checked
            : status.unchecked;
          compute(id, newStatus);
        }}
      />
      <div className="control_indicator"></div>
    </label>
  );
}

export default Checkbox;
