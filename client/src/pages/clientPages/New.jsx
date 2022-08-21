import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientNavBar from "../../components/ClientNavBar";

import "../Form.css";

const URL = "http://localhost:5000";

function New() {
  const [nom, setNom] = useState("");
  const [matFisc, setMatFisc] = useState("");
  const [adresse, setAdresse] = useState("");
  const [tel, setTel] = useState(11111111);
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setUserID(res.data[res.data.length - 1]._id);
    });
  }, []);

  const navigate = useNavigate();

  const AddClient = () => {
    axios.post(`${URL}/clients`, {
      nom: nom,
      matFisc: matFisc,
      adresse: adresse,
      tel: tel,
      email: email,
      user: userID,
    });
  };

  return (
    <main>
      <ClientNavBar />
      <section>
        <h1 className="title">Ajouter un client</h1>
        <div className="Form">
          <label>Nom: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setNom(event.target.value);
            }}
          />
          <label>matFisc: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setMatFisc(event.target.value);
            }}
          />
          <label>Adresse: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setAdresse(event.target.value);
            }}
          />
          <label>Tel: </label>
          <input
            className="input"
            type="tel"
            onChange={(event) => {
              setTel(event.target.value);
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
          <div className="btn-container">
            <button
              className="update"
              onClick={() => {
                AddClient();
                navigate("/clients");
              }}
            >
              Add
            </button>
            <button
              className="delete"
              onClick={() => {
                navigate("/clients");
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

export default New;
