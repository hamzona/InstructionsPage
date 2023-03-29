import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/authContext";
import { MyPostsContextProvider } from "./contexts/myPostsContext";
import { PostContextProvider } from "./contexts/postContext";
import { SinglePostProvider } from "./contexts/singlePostContext";
import { CommentContextProvider } from "./contexts/commentContext";
import { ProfilContextProvider } from "./contexts/ProfilContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <MyPostsContextProvider>
          <ProfilContextProvider>
            <SinglePostProvider>
              <CommentContextProvider>
                <App />
              </CommentContextProvider>
            </SinglePostProvider>
          </ProfilContextProvider>
        </MyPostsContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
