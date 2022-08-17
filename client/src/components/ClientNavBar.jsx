import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./NavBar.css";

const URL = "http://localhost:5000";

function ClientNavBar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios.get(`${URL}/users`).then((res) => {
      setUserName(res.data[res.data.length - 1].nom);
    });
  }, []);

  return (
    <nav className="NavBar-Wrapper">
      <div>
        <h3 className="NavBar-Title">{userName}'s App</h3>
      </div>
      <div className="NavBar-Links">
        <Link to="/clients/new" className="NavBar-Link">
          Ajouter un client
        </Link>
        <Link to="/" className="NavBar-Link">
          Se Déconnecter
        </Link>
      </div>
    </nav>
  );
}

export default ClientNavBar;
