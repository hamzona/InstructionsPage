import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, error] = useLogin();
  function hendleSubmit(e) {
    e.preventDefault();

    login(email, password);
  }

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}
      >
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button type="submit">submit</button>
      </form>
      {error && <div>{error}</div>}
      <Link to="/singup">Singup</Link>
    </div>
  );
}
