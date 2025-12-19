import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { LogOut, Menu } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className="bg-slate-950/50 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left - Logo */}
          <div className="flex-1">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
            >
              NAUTH
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              /* --- Utilisateur Connecté --- */
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition font-medium"
                >
                  Profil
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-300 hover:text-white transition font-medium"
                >
                  Paramètres
                </Link>
                <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {user.fullname}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              /* --- Utilisateur Déconnecté --- */
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-primary btn-sm"
                >
                  Connexion
                </button>
                <Link
                  to="/register"
                  className="btn btn-outline btn-sm text-gray-300 border-gray-600 hover:bg-slate-800"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-circle"
            >
              <Menu className="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Profil
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Paramètres
                </Link>
                <div className="px-4 py-2 border-t border-slate-700 mt-4 pt-4">
                  <p className="text-sm font-semibold text-white mb-1">
                    {user.fullname}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">{user.fullname}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full btn btn-error btn-sm gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full btn btn-primary btn-sm"
                >
                  Connexion
                </button>
                <Link
                  to="/register"
                  className="block btn btn-outline btn-sm text-gray-300 border-gray-600 hover:bg-slate-800 w-full"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
