import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/HomeComponens/Home";
import Input from "./components/Input";
import { Login } from "./components/Login";
import NoUser from "./components/NoUser";
import MyProfil from "./components/MyProfil";
import { Singup } from "./components/Singup";
import { useAuthContext } from "./hooks/useAuthContext";
import useSinglePostContext from "./hooks/useSinglePostContext";
import SinglePost from "./components/SinglePost";
import useProfilContext from "./hooks/useProfilContext";
import UserProfil from "./components/UserProfil";
function App() {
  const { state } = useAuthContext();
  const { singlePost } = useSinglePostContext();
  const { profilData } = useProfilContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profil"
          element={!state.user ? <Navigate to="/" /> : <MyProfil />}
        />
        <Route
          path="/"
          element={
            singlePost === null ? <Home /> : <Navigate to="/singlePost" />
          }
        />
        <Route path="/input" element={<Input />} />
        <Route
          path="/login"
          element={state.user !== null ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/singlePost"
          element={singlePost === null ? <Navigate to="/" /> : <SinglePost />}
        />

        <Route path="noUser" element={<NoUser />} />
        <Route
          path="/singup"
          element={state.user !== null ? <Navigate to="/" /> : <Singup />}
        />
        <Route
          path="/userProfil"
          element={!profilData ? <Navigate to="/" /> : <UserProfil />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
