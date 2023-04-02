import React, { useEffect, useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import SinglePostCss from "../styles/singlePost.module.css";
import InputCommnet from "./InputComment";
import useCommentContext from "../hooks/useCommentContext";
import Comment from "./Comment";
import useProfilContext from "../hooks/useProfilContext";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useAuthContext } from "../hooks/useAuthContext";
export default function SinglePost() {
  const { state } = useAuthContext();
  const { singlePost, dispatch } = useSinglePostContext();
  const { dispatch: ProfilDispatch } = useProfilContext();
  const navigate = useNavigate();
  const { comments } = useCommentContext();
  const [rate, setRate] = useState(0);
  const [isRateUser, setIsRateUser] = useState(false);
  console.log(singlePost);
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
  function isRated() {
    const d = singlePost.usersRated.filter(
      (item) => item.name === state.user.name
    );

    if (d.length === 0) {
      setIsRateUser(false);
    } else {
      setIsRateUser(true);
    }
  }
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };
  useEffect(() => {
    isRated();
  }, [singlePost]);

  /*SEND RATE */
  async function sendRate() {
    console.log(rate);
    const res = await fetch(`http://localhost:4000/api/posts/rate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({ rate: rate, _id: singlePost._id }),
    });

    const json = await res.json();
    console.log(json);
    if (res.ok) {
      dispatch({ type: "setSinglePost", payload: json });
    }
  }
  console.log(singlePost._id);
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

        <div>Rate: {singlePost.rate}</div>
      </div>
      <ReactStars count={5} size={50} onChange={ratingChanged} />
      <button disabled={isRateUser} onClick={() => sendRate()}>
        Submit
      </button>{" "}
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
