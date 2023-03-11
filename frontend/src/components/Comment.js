import React from "react";
import CommentsCss from "../styles/comments.module.css";
export default function Comment({ comment }) {
  return (
    <div className={CommentsCss.container}>
      <div className={CommentsCss.userName}>{comment.userName}</div>
      <div className={CommentsCss.content}>{comment.content}</div>
    </div>
  );
}
