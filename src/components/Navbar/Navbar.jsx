import { Link } from "react-router-dom";
import homeIcon from "/Home.png";
import favoritesIcon from "/favorites.png";
import suggestionsIcon from "/suggestions.png"; // Nuevo icono para sugerencias
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
            <img src={homeIcon} alt="Home" className="navbar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <img src={favoritesIcon} alt="Favorites" className="navbar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/suggestions">
            <img src={suggestionsIcon} alt="Suggestions" className="navbar-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
