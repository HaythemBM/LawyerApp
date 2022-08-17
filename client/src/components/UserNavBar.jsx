import { Link } from "react-router-dom";
import "./NavBar.css";

function UserNavBar() {
  return (
    <nav className="NavBar-Wrapper">
      <div>
        <h3 className="NavBar-Title">Lawyer App</h3>
      </div>
      <div className="NavBar-Links">
        <Link to="/users/login" className="NavBar-Link">
          Se Connecter
        </Link>
        <Link to="/users/register" className="NavBar-Link">
          S'inscrire
        </Link>
      </div>
    </nav>
  );
}

export default UserNavBar;
