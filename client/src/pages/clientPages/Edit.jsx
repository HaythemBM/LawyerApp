import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ClientNavBar from "../../components/ClientNavBar";

import "../Form.css";

const URL = "http://localhost:5000";

function Edit(props) {
  //   const [client, setClient] = useState({});
  const [nom, setNom] = useState("");
  const [matFisc, setMatFisc] = useState("");
  const [adresse, setAdresse] = useState("");
  const [tel, setTel] = useState();
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setUserID(res.data[res.data.length - 1]._id);
    });
    axios.get(`${URL}/clients/${userID}/${id}`).then((res) => {
      setNom(res.data.nom);
      setMatFisc(res.data.matFisc);
      setAdresse(res.data.adresse);
      setTel(res.data.tel);
      setEmail(res.data.email);
      setNom(res.data.nom);
    });
  }, [userID, id]);

  const navigate = useNavigate();

  const UpdateClient = () => {
    axios.put(`${URL}/clients/${id}`, {
      nom: nom,
      matFisc: matFisc,
      adresse: adresse,
      tel: tel,
      email: email,
      user: userID,
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <main>
      <ClientNavBar />
      <section>
        <h1 className="title">Modifier un client</h1>
        <div className="Form">
          <label>Nom: </label>
          <input
            className="input"
            type="text"
            defaultValue={nom}
            onChange={(event) => {
              setNom(event.target.value);
            }}
          />
          <label>matFisc: </label>
          <input
            className="input"
            type="text"
            defaultValue={matFisc}
            onChange={(event) => {
              setMatFisc(event.target.value);
            }}
          />
          <label>Adresse: </label>
          <input
            className="input"
            type="text"
            defaultValue={adresse}
            onChange={(event) => {
              setAdresse(event.target.value);
            }}
          />
          <label>Tel: </label>
          <input
            className="input"
            type="tel"
            defaultValue={tel}
            onChange={(event) => {
              setTel(event.target.value);
            }}
          />
          <label>Email: </label>
          <input
            className="input"
            type="email"
            defaultValue={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div className="btn-container">
            <button
              className="update"
              onClick={() => {
                UpdateClient();
                navigate("/clients");
                refreshPage();
              }}
            >
              Update
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

export default Edit;
