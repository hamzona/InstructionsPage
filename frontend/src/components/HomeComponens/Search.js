import React, { useRef } from "react";
import SearchCss from "../../styles/search.module.css";
import { usePostContext } from "../../hooks/usePostContext";
export default function Search() {
  const search = useRef("");
  const { setSearch } = usePostContext();
  function hendleSubmit(e) {
    e.preventDefault();
    setSearch(search.current.value);
  }
  return (
    <div className={SearchCss.container}>
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <input ref={search} type="text" />
        <button type="submit">search</button>
      </form>
    </div>
  );
}
