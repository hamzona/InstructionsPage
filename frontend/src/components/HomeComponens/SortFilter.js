import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
export default function SortFilter() {
  const { setSortBy, setPage } = usePostContext();
  const [localSort, setLocalSort] = useState("");
  function hendleChange(e) {
    setLocalSort(e.target.value);
  }
  console.log(localSort);

  return (
    <div>
      <select value={localSort} onChange={(e) => hendleChange(e)}>
        <option value={undefined}>unchecked</option>
        <option value={"rate"}>best rated</option>
        <option value={"date"}>najnovije</option>
      </select>
      <button
        onClick={() => {
          setSortBy(localSort);
          setPage(1);
        }}
      >
        Apply
      </button>
    </div>
  );
}
