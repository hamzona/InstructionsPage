import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import { Link, useNavigate } from "react-router-dom";
export default function Input() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [price, setPrice] = useState(0);

  const { state } = useAuthContext();
  const { dispatch: updatePosts } = usePostContext();
  const { dispatch: updateMyPosts } = useMyPostsContext();
  async function hendleSubmit(e) {
    e.preventDefault();
    if (!state.user) {
      return;
    }
    const res = await fetch("http://localhost:4000/api/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({ title: text, price: price }),
    });
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      updatePosts({ type: "addPost", payload: json });
      updateMyPosts({ type: "addMyPost", payload: json });
      setText("");
      navigate("/profil");
    }
  }
  return (
    <div>
      <Link to="/profil">Cancle</Link>
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
