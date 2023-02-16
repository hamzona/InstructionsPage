import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import { Link, useNavigate } from "react-router-dom";
export default function Input() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const { state } = useAuthContext();
  const { dispatch: updatePosts } = usePostContext();
  const { dispatch: updateMyPosts } = useMyPostsContext();

  //POST DATA
  async function hendleSubmit(e) {
    e.preventDefault();
    if (!state.user) {
      return;
    }
    console.log(data);

    const res = await fetch("http://localhost:4000/api/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
      }),
    });
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      updatePosts({ type: "addPost", payload: json });
      updateMyPosts({ type: "addMyPost", payload: json });
      setData("");
      navigate("/profil");
    }
  }

  /*********/
  function hendleChange(e) {
    let copy = data;
    copy[e.target.id] = e.target.value;
    setData(copy);
  }
  return (
    <div>
      <Link to="/profil">Cancle</Link>
      <h1>Input</h1>
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => {
              hendleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={data.description}
            onChange={(e) => {
              hendleChange(e);
            }}
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            value={data.price}
            onChange={(e) => {
              hendleChange(e);
            }}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
