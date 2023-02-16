import React from "react";
import { usePostContext } from "../hooks/usePostContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
function Home() {
  const { state } = usePostContext();
  const { state: stateUser } = useAuthContext();

  return (
    <div>
      <div>
        {stateUser.user !== null ? (
          <Link to="/profil">My profil</Link>
        ) : (
          <div>
            <Link to="/login">login</Link>
            {"  "}
            <Link to="/singup">singup</Link>
          </div>
        )}
      </div>
      <hr></hr>
      <h1>Home</h1>
      {state &&
        state.map((item) => {
          //console.log(item);
          return <div key={item._id}>{item.title}</div>;
        })}
    </div>
  );
}

export default Home;
