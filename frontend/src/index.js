import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/authContext";
import { MyPostsContextProvider } from "./contexts/myPostsContext";
import { PostContextProvider } from "./contexts/postContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <MyPostsContextProvider>
          <App />
        </MyPostsContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
