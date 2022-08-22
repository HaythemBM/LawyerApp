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
      <section>
        <h1>Log In</h1>
        <div className="Form">
          <label>Email: </label>
          <input
            className="input"
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label>Password: </label>
          <input
            className="input"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="btn-container">
            {" "}
            <button
              className="success"
              onClick={() => {
                LogIn();
                navigate("/clients");
              }}
            >
              Log in
            </button>
            <button
              className="delete"
              onClick={() => {
                navigate("/");
              }}
            >
              Return
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthLog;
