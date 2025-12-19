import { Link } from "react-router";

const SideBar = () => {
  return (
    <>
      {/* Barre Latérale (Sidebar) */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* La classe 'menu' de DaisyUI donne un style aux liens de navigation */}
        <ul className="menu p-4 w-60 min-h-full bg-base-300 text-base-content">
          <li className="menu-title mb-4">
            <span className="text-xl font-bold text-primary">NAUTH</span>
          </li>

          {/* Liens de navigation */}
          <li>
            <Link to="/dashboard" className="active">
              Tableau de Bord
            </Link>
          </li>
          <li>
            <Link to="/profile">Profil</Link>
          </li>
          <li>
            <Link to="/settings">Paramètres</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
