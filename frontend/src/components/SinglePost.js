import React from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import SinglePostCss from "../styles/singlePost.module.css";
import InputCommnet from "./InputComment";
import useCommentContext from "../hooks/useCommentContext";
import Comment from "./Comment";
import useProfilContext from "../hooks/useProfilContext";
import { useNavigate } from "react-router-dom";

export default function SinglePost() {
  const { singlePost, dispatch } = useSinglePostContext();
  const { dispatch: ProfilDispatch } = useProfilContext();
  const navigate = useNavigate();
  const { comments } = useCommentContext();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: null });
  }
  async function setProfil() {
    const res = await fetch(
      `http://localhost:4000/api/profil?userName=${singlePost.userName}`
    );
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      ProfilDispatch({ type: "setProfil", payload: json });
      navigate("/userProfil");
    }
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
        <div className={SinglePostCss.header}>
          {singlePost.userName && (
            <div
              className={SinglePostCss.userName}
              onClick={() => {
                setProfil();
              }}
            >
              user: {singlePost.userName}
            </div>
          )}
          {singlePost && (
            <div className={SinglePostCss.title}>{singlePost.title}</div>
          )}
        </div>

        {singlePost.subject && (
          <div className={SinglePostCss.subject}>
            Subject: {singlePost.subject}
          </div>
        )}
        {singlePost.jobType && (
          <div className={SinglePostCss.jobType}>
            Job-Type: {singlePost.jobType}
          </div>
        )}
        {singlePost.description && (
          <div className={SinglePostCss.description}>
            <p>Description</p>
            {singlePost.description}
          </div>
        )}
        {singlePost.price && (
          <div className={SinglePostCss.price}>
            Price: {singlePost.price} KM
          </div>
        )}
      </div>
      <InputCommnet />
      <div className={SinglePostCss.commentsCont}>
        {comments &&
          comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
      </div>
    </div>
  );
}
