import React, { useState } from "react";
import useSinglePostContext from "../hooks/useSinglePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import useCommentContext from "../hooks/useCommentContext";
import InputCommentCss from "../styles/inputComment.module.css";

function InputComment() {
  const [text, setText] = useState("");
  const { singlePost } = useSinglePostContext();
  const { state } = useAuthContext();
  const userName = state.user.name;

  const { dispatch: upadateComment } = useCommentContext();
  async function postComment(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/comments/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Berar ${state.user.token}`,
      },
      body: JSON.stringify({
        content: text,
        postId: singlePost._id,
        userName: userName,
      }),
    });
    const json = await res.json();
    if (await res.ok) {
      upadateComment({ type: "add", payload: json });
      setText("");
    }
  }
  return (
    <div className={InputCommentCss.container}>
      <form
        onSubmit={(e) => postComment(e)}
        className={InputCommentCss.formCont}
      >
        <input
          className={InputCommentCss.input}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Comment"
        />
        <button className={InputCommentCss.submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputComment;
