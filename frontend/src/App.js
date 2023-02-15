import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Input from "./components/Input";
import { Login } from "./components/Login";
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
          element={!state.user ? <Navigate to="/singup" /> : <Profil />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route
          path="/login"
          element={state.user !== null ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/singup"
          element={state.user !== null ? <Navigate to="/home" /> : <Singup />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
