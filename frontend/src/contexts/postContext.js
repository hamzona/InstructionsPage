import { createContext, useEffect, useReducer } from "react";
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

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch("http://localhost:4000/api/posts/allPosts");
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "setPosts", payload: json });
      }
    };
    getAllPosts();
  }, []);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}
