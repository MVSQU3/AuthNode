import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // Note: Assuming `logout` handles the navigation to the home/login page
    logout(navigate);
  };

  return (
    // 'navbar' is the main daisyUI component class for a navigation bar
    // 'bg-base-100' sets a background color from the theme
    // 'shadow-md' adds a subtle shadow
    <div className="navbar bg-base-100 shadow-md">
      {/* --- Section Gauche (Titre de l'Appli) --- */}
      <div className="navbar-start">
        {/* 'btn' and 'btn-ghost' style the Link as a simple button */}
        <Link 
          to={user ? "/dashboard" : "/"} 
          className="btn btn-ghost text-xl normal-case"
        >
          Mon Appli
        </Link>
      </div>

      {/* --- Section Droite (Navigation) --- */}
      {/* 'navbar-end' pushes content to the right */}
      <div className="navbar-end">
        {/* The following structure uses 'menu' and 'menu-horizontal' for a row of links, 
            which is common for desktop navbars. */}
        <ul className="menu menu-horizontal px-1">
          {user ? (
            /* --- Utilisateur Connecté --- */
            <>
              <li>
                {/* DaisyUI uses the 'Link' element's children (the text) as the main content */}
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                {/* 'btn' and 'btn-sm' for a styled button, 'btn-error' for a danger action */}
                <button 
                  onClick={handleLogout} 
                  className="btn btn-error btn-sm"
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            /* --- Utilisateur Déconnecté --- */
            <>
              <li>
                {/* 'btn' and 'btn-primary' for a prominent action button */}
                <button 
                  onClick={() => navigate("/login")} 
                  className="btn btn-primary btn-sm"
                >
                  Connexion
                </button>
              </li>
              <li>
                {/* Simple Link for registration */}
                <Link to="/register">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;