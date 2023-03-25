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
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    let params = new URLSearchParams(`page=${page}&limit=16&search=${search}`);
    if (!search) {
      params.delete("search");
    }

    subjects.forEach((subject) => {
      params.append("subject", subject);
    });

    console.log(params.toString());
    const getAllPosts = async () => {
      const res = await fetch(
        `http://localhost:4000/api/posts/allPosts?${params.toString()}`
      );
      const json = await res.json();
      console.log(json);
      if (res.ok) {
        setPages(json.pages);
        dispatch({ type: "setPosts", payload: json.data });
      }
    };
    getAllPosts();
  }, [page, search, subjects]);
  return (
    <PostContext.Provider
      value={{ state, dispatch, page, setPage, pages, setSubjects, setSearch }}
    >
      {children}
    </PostContext.Provider>
  );
}
