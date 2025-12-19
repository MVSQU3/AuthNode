import { useState } from "react";
import { Link } from "react-router";
import {
  User,
  Bell,
  Shield,
  Lock,
  Trash2,
  Save,
  AlertCircle,
} from "lucide-react";

const Settings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
  });
  const [twoFA, setTwoFA] = useState(true);

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length > 0) {
      alert("Mot de passe modifié avec succès!");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Les mots de passe ne correspondent pas ou sont vides");
    }
  };

  const handleDeleteAccount = () => {
    alert("Compte supprimé avec succès!");
    setShowDeleteModal(false);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-slate-900 min-h-screen">
        {/* Header */}
        <div className="navbar bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost drawer-button lg:hidden"
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
            <h1 className="text-2xl font-bold px-4 text-white">Paramètres</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profil Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Profil</h2>
                  <p className="text-gray-400 text-sm">
                    Gérez vos informations personnelles
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 font-semibold mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    placeholder="Jean Dupont"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="jean@example.com"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
              <button className="btn btn-primary btn-sm">
                <Save className="w-4 h-4" />
                Enregistrer les modifications
              </button>
            </div>

            {/* Notifications Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Notifications
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Gérez vos préférences de notifications
                  </p>
                </div>
              </div>
            </div>

            {/* Sécurité Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Sécurité</h2>
                  <p className="text-gray-400 text-sm">
                    Gérez vos paramètres de sécurité
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 border border-slate-600 rounded-lg hover:border-purple-500/50 transition">
                  <div>
                    <p className="text-white font-medium">
                      Authentification à deux facteurs
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      État:{" "}
                      <span className="text-green-400 font-semibold">
                        Activée
                      </span>
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={twoFA}
                    onChange={(e) => setTwoFA(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Modifier le Mot de Passe Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Mot de Passe
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Modifiez votre mot de passe
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="btn btn-outline btn-primary btn-sm"
              >
                Modifier le mot de passe
              </button>
            </div>

            {/* Supprimer le Compte Section */}
            <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-400">
                    Zone de Danger
                  </h2>
                  <p className="text-red-300/70 text-sm">
                    Actions irréversibles
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-error btn-outline btn-sm"
              >
                Supprimer le compte
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SideBar - Remplacer par <SideBar /> */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="bg-slate-950 w-72 min-h-full border-r border-slate-800">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-8">NAUTH</h2>
          </div>
          <ul className="menu text-gray-300 space-y-2 px-4 flex-1">
            <li>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:bg-slate-800 rounded"
              >
                Tableau de Bord
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:bg-slate-800 rounded">
                Profil
              </Link>
            </li>
            <li>
              <Link to="/settings" className="text-white bg-slate-800 rounded">
                Paramètres
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal - Modifier Mot de Passe */}
      {showPasswordModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-slate-800 border border-slate-700 max-w-md">
            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              Modifier le mot de passe
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 font-semibold mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-semibold mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-semibold mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="btn btn-ghost text-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleChangePassword}
                className="btn btn-primary"
              >
                Modifier
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowPasswordModal(false)}
          />
        </div>
      )}

      {/* Modal - Supprimer le Compte */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-slate-800 border border-slate-700 max-w-md">
            <h3 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Supprimer le compte
            </h3>

            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est{" "}
              <span className="font-bold text-red-400">irréversible</span> et
              toutes vos données seront perdues.
            </p>

            <div className="modal-action">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-ghost text-gray-300"
              >
                Annuler
              </button>
              <button onClick={handleDeleteAccount} className="btn btn-error">
                Supprimer définitivement
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowDeleteModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Settings;
