import { createContext, useEffect, useReducer, useState } from "react";
export const PostContext = createContext();
function updateReducer(state, action) {
  switch (action.type) {
    case "setPosts":
      return action.payload;
    case "addPost":
      return [action.payload, ...state];
    case "deletePost":
      return state.filter((item) => item._id !== action.payload._id);
    case "updatePosts":
    default:
      return state;
  }
}
export function PostContextProvider({ children }) {
  const [state, dispatch] = useReducer(updateReducer, null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch(
        `http://localhost:4000/api/posts/allPosts?page=${page}&limit=16`
      );
      const json = await res.json();
      console.log(json);
      if (res.ok) {
        setPages(json.pages);
        dispatch({ type: "setPosts", payload: json.data });
      }
    };
    getAllPosts();
  }, [page]);
  return (
    <PostContext.Provider value={{ state, dispatch, page, setPage, pages }}>
      {children}
    </PostContext.Provider>
  );
}
