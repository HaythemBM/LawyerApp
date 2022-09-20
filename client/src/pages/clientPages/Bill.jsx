import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";

import BillNavBar from "../../components/BillNavBar";

import "../Form.css";

const URL = "http://localhost:5000";

function Bill(props) {
  const [name, setName] = useState("");
  const [price1, setPrice1] = useState();
  const [price2, setPrice2] = useState();
  const [case1, setCase1] = useState("");
  const [case2, setCase2] = useState("");
  const [matFisc, setMatFisc] = useState("");

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${URL}/clients/lookfor/${id}`).then((res) => {
      setName(res.data.nom);
      setMatFisc(res.data.matFisc);
    });
    axios.get(`${URL}/dossiers/${id}`).then((res) => {
      setCase1(res.data[0].sujet);
      setCase2(res.data[1].sujet);
      setPrice1(res.data[0].prix);
      setPrice2(res.data[1].prix);
    });
  }, [id]);
  // return {
  //   clientName: name,
  //   price1: price1,
  //   price2: price2,
  //   case1: case1,
  //   case2: case2,
  //   matFisc: matFisc,
  // };

  // const handleChange = ({ target: { value, name } }) =>
  //   (state = { [name]: value });

  const createAndDownloadPdf = () => {
    axios
      .post(`${URL}/create-pdf`, {
        name: name,
        matFisc: matFisc,
        price1: price1,
        price2: price2,
        case1: case1,
        case2: case2,
      })
      .then(() => axios.get(`${URL}/fetch-pdf`, { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "Billlication/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (
    <main>
      <BillNavBar />
      <section>
        <h3>
          Veuillez réecrire les données présentés pour confirmez votre identité
        </h3>
        <div className="Bill Form">
          <div className="label">
            <label>Client Name:</label>
            <span>{name}</span>
          </div>
          <input
            className="input"
            type="text"
            name="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />{" "}
          <div className="label">
            <label>Matrice Fiscale:</label>
            <span>{matFisc}</span>
          </div>
          <input
            className="input"
            type="text"
            name="matFisc"
            onChange={(event) => {
              setMatFisc(event.target.value);
            }}
          />{" "}
          <div className="label">
            <label>Nom du dossier 1:</label>
            <span>{case1}</span>
          </div>
          <input
            className="input"
            type="text"
            name="case1"
            onChange={(event) => {
              setCase1(event.target.value);
            }}
          />{" "}
          <div className="label">
            <label>Prix du dossier 1:</label>
            <span>{price1}</span>
          </div>
          <input
            className="input"
            type="number"
            name="price1"
            onChange={(event) => {
              setPrice1(event.target.value);
            }}
          />{" "}
          <div className="label">
            <label>Nom du dossier 2:</label>
            <span>{case2}</span>
          </div>
          <input
            className="input"
            type="text"
            name="case2"
            onChange={(event) => {
              setCase2(event.target.value);
            }}
          />{" "}
          <div className="label">
            <label>Prix du dossier 2:</label>
            <span>{price2}</span>
          </div>
          <input
            className="input"
            type="number"
            name="price2"
            onChange={(event) => {
              setPrice2(event.target.value);
            }}
          />
          <button className="success" onClick={createAndDownloadPdf}>
            Télécharger la Facture
          </button>
        </div>
      </section>
    </main>
  );
}

export default Bill;
