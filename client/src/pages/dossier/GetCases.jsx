import { useState, useEffect, React } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../info.css";

const URL = "http://localhost:5000";

function GetCases() {
  const [idu, setIdu] = useState("");
  const [clientName, setClientName] = useState("");
  const [casesList, setCasesList] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setIdu(res.data[res.data.length - 1]._id);
    });
    axios.get(`${URL}/clients/${idu}/${id}`).then((res) => {
      setClientName(res.data.nom);
    });
    axios.get(`${URL}/dossiers/${id}`).then((res) => {
      setCasesList(res.data);
    });
  }, [idu, id]);

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <main>
      <nav className="NavBar-Wrapper">
        <div>
          <h3 className="NavBar-Title">{clientName}'s Cases</h3>
        </div>
        <div className="NavBar-Links">
          <Link to={"/dossiers/" + id + "/new"} className="NavBar-Link">
            Ajouter un dossier
          </Link>
          <Link to="/clients" className="NavBar-Link">
            Retourner aux clients
          </Link>
        </div>
      </nav>
      <section>
        <h2>{clientName}'s Cases List :</h2>
        {casesList.map((val, key) => {
          return (
            <div className="item">
              <div className="info">
                <div>
                  <h3>Numéro:</h3>
                  <p>{val.num}</p>
                </div>
                <div>
                  <h3>Sujet:</h3>
                  <p>{val.sujet}</p>
                </div>
                <div>
                  <h3>Référence:</h3>
                  <p>{val.ref}</p>
                </div>
                <div>
                  <h3>Prix:</h3>
                  <p>{val.prix}</p>
                </div>
              </div>
              <div className="btn-container">
                <button
                  className="update"
                  onClick={() => {
                    navigate(`/dossiers/${id}/edit/${val._id}`);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    axios.delete(`${URL}/dossiers/${val._id}`);
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

export default GetCases;
