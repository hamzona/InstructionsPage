import React from "react";
import { usePostContext } from "../../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import HomePosts from "./HomePosts";
import HomeCss from "../../styles/home.module.css";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Search from "./Search";
function Home() {
  const { state } = usePostContext();
  const { state: stateUser } = useAuthContext();

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
      <Search />
      <Filter />
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
