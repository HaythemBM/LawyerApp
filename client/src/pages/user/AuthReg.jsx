import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";

import "../Form.css";

const URL = "http://localhost:5000";

function AuthReg() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const AddToList = () => {
    axios.post(`${URL}/users/register`, {
      nom: nom,
      email: email,
      password: password,
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <main>
      <UserNavBar />
      <section>
        <h1>Register</h1>
        <div className="Form">
          <label>Nom: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setNom(event.target.value);
            }}
          />
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
            <button
              className="success"
              onClick={() => {
                AddToList();
                navigate("/clients");
                refreshPage();
              }}
            >
              Add User
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

export default AuthReg;
