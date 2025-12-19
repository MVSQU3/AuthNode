import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router";
import toast from "react-hot-toast";
const ResetPasswordConfirm = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const resetPasswordConfirm = useUserStore(
    (state) => state.resetPasswordConfirm
  );
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas");
    }
    const success = await resetPasswordConfirm(password, token);

    if (success) {
      alert("Mot de passe modifié avec succès !");
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Réinitialiser le mot de passe
            </h2>
            <p className="text-gray-400">Entrez votre nouveau mot de passe</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="newPassword"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
                value={password.newPassword}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
                value={password.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 mt-6"
            >
              Réinitialiser le mot de passe
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Vous vous souvenez de votre mot de passe ?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
