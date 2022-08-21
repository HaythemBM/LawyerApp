import { useState, React, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../Form.css";

const URL = "http://localhost:5000";

function NewFolder() {
  const [idu, setIdu] = useState("");
  const [clientName, setClientName] = useState("");

  const [num, setNum] = useState();
  const [sujet, setSujet] = useState("");
  const [ref, setRef] = useState("");
  const [prix, setPrix] = useState();

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setIdu(res.data[res.data.length - 1]._id);
    });
    axios.get(`${URL}/clients/${idu}/${id}`).then((res) => {
      setClientName(res.data.nom);
    });
  }, [idu, id]);

  const navigate = useNavigate();

  const AddCase = () => {
    axios.post(`${URL}/dossiers`, {
      num: num,
      sujet: sujet,
      ref: ref,
      prix: prix,
      client: id,
    });
  };

  return (
    <main>
      <nav className="NavBar-Wrapper">
        <div>
          <h3 className="NavBar-Title">{clientName}'s Cases</h3>
        </div>
        <div className="NavBar-Links">
          <Link to="/clients" className="NavBar-Link">
            Retourner aux clients
          </Link>
        </div>
      </nav>
      <section>
        <h1 className="title">Ajouter un dossier</h1>
        <div className="Form">
          <label>Num: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setNum(event.target.value);
            }}
          />
          <label>sujet: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setSujet(event.target.value);
            }}
          />
          <label>ref: </label>
          <input
            className="input"
            type="text"
            onChange={(event) => {
              setRef(event.target.value);
            }}
          />
          <label>prix: </label>
          <input
            className="input"
            type="prix"
            onChange={(event) => {
              setPrix(event.target.value);
            }}
          />
          <div className="btn-container">
            <button
              className="update"
              onClick={() => {
                AddCase();
                navigate(`/dossiers/${id}`);
              }}
            >
              Add
            </button>
            <button
              className="delete"
              onClick={() => {
                navigate(`/dossiers/${id}`);
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

export default NewFolder;
