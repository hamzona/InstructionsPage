import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { useMyPostsContext } from "../hooks/useMyPostsContext";
import { Link, useNavigate } from "react-router-dom";
import InputCss from "../styles/input.module.css";

export default function Input() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
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
    if (!res.ok) {
      setError(json.error);
    }
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
    <div className={InputCss.container}>
      <Link className={InputCss.back} to="/profil">
        Cancle
      </Link>
      <div className={InputCss.formContainer}>
        <div className={InputCss.title}>Input</div>
        <form
          className={InputCss.form}
          onSubmit={(e) => {
            hendleSubmit(e);
          }}
        >
          <div className={InputCss.inputContainer}>
            <label className={InputCss.label} htmlFor="title">
              Title:*{" "}
            </label>
            <input
              className={InputCss.input}
              type="text"
              id="title"
              value={data.title}
              onChange={(e) => {
                hendleChange(e);
              }}
            />
          </div>
          <div className={InputCss.inputContainer}>
            <label className={InputCss.label} htmlFor="description">
              Description:
            </label>
            <textarea
              className={InputCss.inputDescription}
              type="text"
              id="description"
              value={data.description}
              onChange={(e) => {
                hendleChange(e);
              }}
            />
          </div>
          <div className={InputCss.inputContainer}>
            <label className={InputCss.label} htmlFor="price">
              Price:{" "}
            </label>
            <div className={InputCss.priceValuteCont}>
              <input
                className={InputCss.inputPrice}
                type="number"
                id="price"
                value={data.price}
                onChange={(e) => {
                  hendleChange(e);
                }}
              />
              KM
            </div>
          </div>
          <button className={InputCss.button} type="submit">
            submit
          </button>
          {error && <div className={InputCss.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
