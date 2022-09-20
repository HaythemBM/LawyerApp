import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./NavBar.css";

const URL = "http://localhost:5000";

function BillNavBar() {
  const [idu, setIdu] = useState("");
  const [clientName, setClientName] = useState("");

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setIdu(res.data[res.data.length - 1]._id);
    });
    axios.get(`${URL}/clients/${idu}/${id}`).then((res) => {
      setClientName(res.data.nom);
    });
  }, [idu, id]);

  return (
    <nav className="NavBar-Wrapper">
      <div>
        <h3 className="NavBar-Title">{clientName}'s Bill</h3>
      </div>
      <div className="NavBar-Links">
        <Link to="/clients" className="NavBar-Link">
          Retourner aux clients
        </Link>
      </div>
    </nav>
  );
}

export default BillNavBar;
