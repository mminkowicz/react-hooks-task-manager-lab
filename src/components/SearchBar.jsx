import React, { useRef, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const inputRef = useRef(null);
  const { setQuery } = useContext(TaskContext);

  function handleChange() {
    const value = inputRef.current?.value || "";
    setQuery(value);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        onChange={handleChange}
        aria-label="Search tasks"
      />
    </div>
  );
}

export default SearchBar;