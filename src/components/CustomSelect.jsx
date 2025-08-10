import { useState } from "react";

const CustomSelect =({ options, value, onChange })=> {
  const [open, setOpen] = useState(false);

  const handleBlur = () => setTimeout(() => setOpen(false), 150);

  return (
    <div
      className="custom-select-wrapper"
      tabIndex={0}
      onBlur={handleBlur}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      <div
        className="custom-select"
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        aria-label="Select tone"
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="custom-options" role="listbox">
          {options.map((opt) => (
            <p
              key={opt}
              className={opt === value ? "selected" : ""}
              onMouseDown={() => {
                onChange(opt);
                setOpen(false);
              }}
              role="option"
              aria-selected={opt === value}
              tabIndex={-1}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}


export default CustomSelect;