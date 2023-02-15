import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import Posts from "./Posts";

export default function Profil() {
  const [text, setText] = useState("");
  const { state, dispatch } = useAuthContext();
  const { dispatch: updatePosts } = usePostContext();
  const { state: myPosts, dispatch: updateMyPosts } = useMyPostsContext();

  function hendleClick() {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  }

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Profil</h1>
      {state.user && <div>{state.user.email}</div>}
      <button
        onClick={() => {
          hendleClick();
        }}
      >
        Log out
      </button>
      <br></br>
      <Link to="/input">upload new post</Link>
      <h2>My posts:</h2>
      {myPosts &&
        myPosts.map((item) => {
          return <Posts key={item._id} item={item} />;
        })}
    </div>
  );
}
