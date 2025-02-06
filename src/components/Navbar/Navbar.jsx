import { useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "/Home.png";
import favoritesIcon from "/favorites.png";
import suggestionsIcon from "/suggestions.png";
import menuOpenIcon from "/menu-open.png"; // Imagen para abrir el menú
import menuCloseIcon from "/menu-close.png"; // Imagen para cerrar el menú
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Botón menú hamburguesa */}
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={menuOpen ? menuCloseIcon : menuOpenIcon} alt="Menu" className="menu-icon" />
      </button>

      {/* Menú de navegación */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)} className="nav-item">
            <img src={homeIcon} alt="Home" className="navbar-icon" />
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/favorites" onClick={() => setMenuOpen(false)} className="nav-item">
            <img src={favoritesIcon} alt="Favorites" className="navbar-icon" />
            <span className="nav-text">Favorites</span>
          </Link>
        </li>
        <li>
          <Link to="/suggestions" onClick={() => setMenuOpen(false)} className="nav-item">
            <img src={suggestionsIcon} alt="Suggestions" className="navbar-icon" />
            <span className="nav-text">Suggestions</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
