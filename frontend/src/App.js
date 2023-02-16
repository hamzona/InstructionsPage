import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Input from "./components/Input";
import { Login } from "./components/Login";
import NoUser from "./components/NoUser";
import Profil from "./components/Profil";
import { Singup } from "./components/Singup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { state } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profil"
          element={!state.user ? <Navigate to="/noUser" /> : <Profil />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route
          path="/login"
          element={state.user !== null ? <Navigate to="/" /> : <Login />}
        />
        <Route path="noUser" element={<NoUser />} />
        <Route
          path="/singup"
          element={state.user !== null ? <Navigate to="/" /> : <Singup />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
