import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    // Utilisez la classe DaisyUI 'drawer' pour une mise en page flexible
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Contenu principal de la page (page-content) */}
      <div className="drawer-content flex flex-col items-center justify-start p-6 bg-gray-50 min-h-screen">
        {/* Barre de navigation supérieure pour mobile/bouton d'ouverture */}
        <div className="w-full flex justify-between items-center lg:hidden mb-4">
          <h1 className="text-2xl font-bold">Tableau de Bord</h1>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button"
          >
            Menu
          </label>
        </div>

        {/* Titre principal pour le contenu */}
        <div className="w-full max-w-4xl text-left mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Bienvenue, {user?.fullname || "Utilisateur"} !
          </h1>
          <p className="text-gray-500 mt-1">
            Aperçu rapide et actions principales.
          </p>
        </div>

        {/* Espace pour les cartes de statistiques (Grid de Tailwind) */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte 1 : Tâches en cours */}
          <div className="card bg-white shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Tâches en Cours
            </h3>
            <p className="text-4xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-500 mt-2">
              Nouveaux éléments à vérifier.
            </p>
          </div>

          {/* Carte 2 : Messages */}
          <div className="card bg-white shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Nouveaux Messages
            </h3>
            <p className="text-4xl font-bold text-gray-800">5</p>
            <p className="text-sm text-gray-500 mt-2">
              Dernière mise à jour hier.
            </p>
          </div>

          {/* Carte 3 : Revenus */}
          <div className="card bg-white shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Total Ventes
            </h3>
            <p className="text-4xl font-bold text-gray-800">$12,450</p>
            <p className="text-sm text-gray-500 mt-2">
              Objectif atteint à 85%.
            </p>
          </div>
        </div>

        {/* Section de contenu plus bas (ex: tableau ou flux d'activité) */}
        <div className="w-full max-w-4xl mt-10 p-6 bg-white shadow-lg rounded-box">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Activité Récente
          </h3>
          <p className="text-gray-500">
            C'est ici que vous insérerez les listes, tableaux, ou graphiques
            complexes.
          </p>
          {/* Placeholder pour une table */}
          <div className="mockup-code mt-4">
            <pre data-prefix=">">
              <code>Activité en attente...</code>
            </pre>
          </div>
        </div>
      </div>

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
            <span className="text-xl font-bold text-primary">Mon App</span>
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
    </div>
  );
};

export default Dashboard;