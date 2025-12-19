import { useState } from "react";
import { LogOut, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
  // Mock user data - remplacer par useAuthStore dans ton projet
  const [user] = useState({
    _id: "694466af3fe3bc5d69b41c09",
    fullname: "Juju",
    email: "juju@mail.com",
  });

  const handleLogout = () => {
    alert("Déconnexion en cours...");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Contenu principal */}
      <div className="drawer-content flex flex-col bg-slate-900 min-h-screen">
        {/* Header/Navbar */}
        <div className="navbar bg-slate-950 border-b border-slate-800 px-6">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <span className="text-xl font-bold text-white hidden lg:inline">
              Dashboard
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Tableau de Bord
              </h1>
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                    {user?.fullname?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    Bienvenue, {user?.fullname || "Utilisateur"} !
                  </h2>
                  <p className="text-gray-400">
                    Gérez votre compte et vos paramètres de sécurité
                  </p>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Authentification Card */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        Authentification
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Statut de votre compte
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg font-semibold text-sm">
                    Actif
                  </div>
                </div>
              </div>

              {/* Sécurité Card */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Sécurité</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Mot de passe et 2FA</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-semibold text-sm">
                    Activé
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  Informations du Compte
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom complet */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">
                    Nom complet
                  </p>
                  <p className="text-xl font-bold text-white">
                    {user?.fullname || "N/A"}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">
                    Adresse email
                  </p>
                  <p className="text-xl font-bold text-white break-all">
                    {user?.email || "N/A"}
                  </p>
                </div>

                {/* ID Utilisateur */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">
                    ID Utilisateur
                  </p>
                  <p className="text-sm font-mono text-gray-300">
                    {user?._id || "N/A"}
                  </p>
                </div>

                {/* Statut */}
                <div>
                  <p className="text-gray-400 text-sm font-semibold mb-2">
                    Statut
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-lg font-bold text-green-400">Connecté</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Actions Rapides
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="btn btn-primary gap-2 bg-blue-600 hover:bg-blue-700 border-none">
                  <Lock className="w-4 h-4" />
                  Modifier le mot de passe
                </button>
                <button className="btn bg-cyan-600 hover:bg-cyan-700 border-none text-white gap-2">
                  <Shield className="w-4 h-4" />
                  Paramètres de sécurité
                </button>
                <button className="btn btn-ghost text-gray-300 hover:text-white hover:bg-slate-700">
                  Voir l'historique de connexion
                </button>
                <button className="btn btn-ghost text-gray-300 hover:text-white hover:bg-slate-700">
                  Gérer les appareils
                </button>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-yellow-500/10 border border-yellow-600/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-bold text-yellow-400">
                  Recommandations de Sécurité
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Utilisez un mot de passe fort et unique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Activez l'authentification à deux facteurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>
                    Vérifiez régulièrement votre historique de connexion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Ne partagez jamais vos identifiants de connexion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SideBar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="bg-slate-950 w-72 min-h-full border-r border-slate-800">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-8">NAUTH</h2>
          </div>
          <ul className="menu text-gray-300 space-y-2 px-4">
            <li>
              <Link
                to={"/dashboard"}
                className="text-white bg-slate-800 rounded"
              >
                Tableau de Bord
              </Link>
            </li>
            <li>
              <Link to={"/profile"} className="hover:bg-slate-800 rounded">
                Profil
              </Link>
            </li>
            <li>
              <Link to={"/settings"} className="hover:bg-slate-800 rounded">
                Paramètres
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
