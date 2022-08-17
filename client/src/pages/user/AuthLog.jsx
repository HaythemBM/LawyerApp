import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";

import "../Form.css";

const URL = "http://localhost:5000";

function AuthLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const LogIn = () => {
    axios.post(`${URL}/users/login`, {
      email: email,
      password: password,
    });
  };

  return (
    <main>
      <UserNavBar />
      <h1>Log In</h1>
      <div className="Form">
        <label>Email: </label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password: </label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          className="success"
          onClick={() => {
            LogIn();
            navigate("/clients");
          }}
        >
          Log in
        </button>
      </div>
    </main>
  );
}

export default AuthLog;
