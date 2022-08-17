import { useState, React, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import CasesNavBar from "../../components/CasesNavBar";

import "../Form.css";

const URL = "http://localhost:5000";

function EditFolder() {
  const [num, setNum] = useState();
  const [sujet, setSujet] = useState("");
  const [ref, setRef] = useState("");
  const [prix, setPrix] = useState();
  const [clientID, setClientID] = useState("");

  let { id, idd } = useParams();

  useEffect(() => {
    axios.get(`${URL}/dossiers/lookfor/${idd}`).then((res) => {
      setNum(res.data.num);
      setSujet(res.data.sujet);
      setRef(res.data.ref);
      setPrix(res.data.prix);
      setClientID(res.data.client);
    });
  }, [idd]);

  const navigate = useNavigate();

  const UpdateClient = () => {
    axios.put(`${URL}/dossiers/${idd}`, {
      num: num,
      sujet: sujet,
      ref: ref,
      prix: prix,
      client: clientID,
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <CasesNavBar />
      <h1>Modifier un dossier</h1>
      <div className="Form">
        <label>Num: </label>
        <input
          type="text"
          defaultValue={num}
          onChange={(event) => {
            setNum(event.target.value);
          }}
        />
        <label>sujet: </label>
        <input
          type="text"
          defaultValue={sujet}
          onChange={(event) => {
            setSujet(event.target.value);
          }}
        />
        <label>ref: </label>
        <input
          type="text"
          defaultValue={ref}
          onChange={(event) => {
            setRef(event.target.value);
          }}
        />
        <label>prix: </label>
        <input
          type="prix"
          defaultValue={prix}
          onChange={(event) => {
            setPrix(event.target.value);
          }}
        />
        <div className="btn-container">
          <button
            className="update"
            onClick={() => {
              UpdateClient();
              navigate(`/dossiers/${id}`);
              refreshPage();
            }}
          >
            Update
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
    </div>
  );
}

export default EditFolder;
