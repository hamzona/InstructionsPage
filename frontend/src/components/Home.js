import React from "react";
import { usePostContext } from "../hooks/usePostContext";
import { Link } from "react-router-dom";

function Home() {
  const { state } = usePostContext();

  return (
    <div>
      <div>
        <Link to="/profil">My profil</Link>
        {/* <Link to="/login">login</Link>
        <Link to="/singup">singup</Link> */}
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
