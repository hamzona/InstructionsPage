import React from "react";
import HomePostsCss from "../styles/homePosts.module.css";
import useSinglePostContext from "../hooks/useSinglePostContext";
//import { useNavigate } from "react-router-dom";
export default function HomePosts({ item }) {
  const { dispatch } = useSinglePostContext();
  //const navigate = useNavigate();
  function hendleClick() {
    dispatch({ type: "setSinglePost", payload: item });
    // navigate("/singlePost");
  }
  return (
    <div
      className={HomePostsCss.container}
      onClick={() => {
        hendleClick();
      }}
    >
      <div className={HomePostsCss.userName}>User: {item.userName}</div>
      <div className={HomePostsCss.title}>{item.title}</div>
      {item.description && <div>description: {item.description}</div>}
      {item.subject && <div>subject: {item.subject}</div>}
      {item.jobType && <div>job: {item.jobType}</div>}
      {item.price && <div>price: {item.price} KM</div>}
    </div>
  );
}
