import React from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import SinglePostCss from "../styles/singlePost.module.css";
export default function SinglePost() {
  const { singlePost, dispatch } = useSinglePostContext();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: null });
  }
  return (
    <div className={SinglePostCss.container}>
      <button
        className={SinglePostCss.back}
        onClick={() => {
          hendleClick();
        }}
      >
        CANCLE
      </button>

      <div className={SinglePostCss.postContainer}>
        {singlePost && (
          <div className={SinglePostCss.title}>{singlePost.title}</div>
        )}
        {singlePost.description && <div>{singlePost.description}</div>}
        <form>
          Comments
          <input type="text" />
        </form>
      </div>
    </div>
  );
}
