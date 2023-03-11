import React, { useState } from "react";
import { usePostContext } from "../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import HomePosts from "./HomePosts";
import HomeCss from "../styles/home.module.css";
import Pagination from "./Pagination";

function Home() {
  const { state } = usePostContext();
  const { state: stateUser } = useAuthContext();
  /*
  const [query, setQuery] = useState("");
  const [filterWindow, setFilterWindow] = useState(true);
  /*
  if (state !== null) {
    state.forEach((item) => {
      if (item.title.includes(query)) {
        console.log(item);
      }
    });
  }*/

  return (
    <div className={HomeCss.container}>
      <div className={HomeCss.homeNav}>
        {stateUser.user !== null ? (
          <Link className={HomeCss.profilLink} to="/profil">
            My profil: {stateUser.user.name}
          </Link>
        ) : (
          <div className={HomeCss.loginSingupCont}>
            <Link className={HomeCss.loginLink} to="/login">
              login
            </Link>
            {"  "}
            <Link className={HomeCss.singupLink} to="/singup">
              singup
            </Link>
          </div>
        )}
      </div>

      {/* <div className={HomeCss.searchBarContainer}>
        <input
          className={HomeCss.searchBarInput}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <button
          style={{ display: filterWindow ? "block" : "none" }}
          onClick={() => setFilterWindow(false)}
        >
          Filter
        </button>
        <form
          style={{ display: !filterWindow ? "block" : "none" }}
          onSubmit={(e) => {
            e.preventDefault();
            setFilterWindow(true);
          }}
        >
          <input></input>
          <button type="submit">submit</button>
        </form>
      </div> */}

      <div className={HomeCss.posts}>
        {state &&
          state.map((item) => {
            return <HomePosts key={item._id} item={item} />;
          })}
      </div>

      <Pagination />
    </div>
  );
}

export default Home;
