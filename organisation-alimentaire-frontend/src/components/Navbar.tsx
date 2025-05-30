import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <img src={logo} alt="YUMGUARD Logo" />
          <span className="app-name">YUMGUARD</span>
        </div>

        <div className="navbar-right">
          <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : ""}>
            Accueil
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/inventaire" className={({ isActive }) => isActive ? "active-link" : ""}>
                Inventaire
              </NavLink>
              <NavLink to="/courses" className={({ isActive }) => isActive ? "active-link" : ""}>
                Liste des courses
              </NavLink>
              <NavLink to="/suggestions" className={({ isActive }) => isActive ? "active-link" : ""}>
              Suggestions
</NavLink>

              <button className="logout-button" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          )}
          {!isAuthenticated && (
            <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>
              Connexion
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
