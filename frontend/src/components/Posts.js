import React from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import { usePostContext } from "../hooks/usePostContext";
//import { useNavigate } from "react-router-dom";

export default function Posts({ item }) {
  const { state } = useAuthContext();
  const { dispatch: updateMyPosts } = useMyPostsContext();
  const { dispatch: updatePosts } = usePostContext();

  //const navigate = useNavigate();

  async function hendleDeleteClick() {
    if (!state.user) {
      return;
    }
    const res = await fetch("http://localhost:4000/api/posts/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({ _id: item._id }),
    });

    const json = await res.json();
    console.log(json);

    if (res.ok) {
      updateMyPosts({ type: "deleteMyPost", payload: json });
      updatePosts({ type: "delete", payload: json });
    }
  }

  // async function handleUpdateClick() {
  //   navigate("/input");
  // }

  return (
    <div>
      {item.title}
      {"   "}
      {item.price + "Km"}
      <button onClick={() => hendleDeleteClick()}>DELETE</button>
      {/* <button onClick={() => handleUpdateClick()}>UPDATE</button> */}
    </div>
  );
}
