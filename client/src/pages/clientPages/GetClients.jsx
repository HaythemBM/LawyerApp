import { useState, useEffect, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientNavBar from "../../components/ClientNavBar";

import "../info.css";

const URL = "http://localhost:5000";

function GetClients() {
  const [idu, setIdu] = useState("");
  const [username, setUserName] = useState("");
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setIdu(res.data[res.data.length - 1]._id);
      setUserName(res.data[res.data.length - 1].nom);
    });
    axios.get(`${URL}/clients/${idu}`).then((res) => {
      setClientsList(res.data);
    });
  }, [idu]);

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <main>
      <ClientNavBar />
      <section>
        <h2>{username}'s client List :</h2>
        {clientsList.map((val, key) => {
          return (
            <div className="item">
              <div className="info">
                <div>
                  <h3>Nom:</h3>
                  <p>{val.nom}</p>
                </div>
                <div>
                  <h3>matFisc:</h3>
                  <p>{val.matFisc}</p>
                </div>
                <div>
                  <h3>Adresse:</h3>
                  <p>{val.adresse}</p>
                </div>
                <div>
                  <h3>Téléphone:</h3>
                  <p>{val.tel}</p>
                </div>
                <div>
                  <h3>Email:</h3>
                  <p>{val.email}</p>
                </div>
              </div>
              <div className="btn-container">
                <button
                  className="success"
                  onClick={() => {
                    navigate(`/dossiers/${val._id}`);
                    for (let i = 0; i < 75; i++) {
                      refreshPage();
                    }
                  }}
                >
                  Voir Dossiers
                </button>
                <button
                  className="update"
                  onClick={() => {
                    navigate(`/clients/edit/${val._id}`);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    axios.delete(`${URL}/clients/${val._id}`);
                    navigate("/clients");
                    refreshPage();
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default GetClients;
