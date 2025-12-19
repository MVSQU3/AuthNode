import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
// styled-components n'est plus nécessaire

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await register(formData, navigate);

    if (response.success) {
      return toast.success("Bienvenue ! Votre compte est créé 🎉");
    } else {
      if (response.errors && response.errors.length > 0) {
        // 1. On regroupe toutes les erreurs avec un saut de ligne (\n)
        const fullErrorMessage = response.errors.join("\n");

        // 2. On affiche un seul toast avec tout le contenu
        return toast.error(fullErrorMessage, {
          duration: 5000, // On laisse un peu plus de temps pour lire
        });
      } else {
        // Si response.message est undefined, on affiche la chaîne à droite
        return toast.error(
          response.message ?? "Une erreur inconnue est survenue"
        );
      }
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
      <div className="relative z-10 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Info */}
          <div className="text-left space-y-6 hidden md:block">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Rejoignez<br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  la communauté NAUTH
                </span>
              </h1>
              <p className="text-lg text-gray-400">
                Créez votre compte en quelques secondes et commencez à sécuriser vos applications dès maintenant.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-gray-300">Authentification de grade entreprise</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-gray-300">Configuration rapide et facile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-gray-300">Support disponible 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
              
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Créer un compte</h2>
                <p className="text-gray-400">Inscrivez-vous pour démarrer votre aventure NAUTH</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="fullname"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="Jean Dupont"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="vous@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      name="password"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 8 caractères avec majuscules et chiffres
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      S'inscrire
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Terms & Conditions */}
                <p className="text-xs text-gray-500 text-center">
                  En vous inscrivant, vous acceptez nos{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    conditions d'utilisation
                  </a>
                  {" "}et notre{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    politique de confidentialité
                  </a>
                </p>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800/50 text-gray-400">Vous avez déjà un compte ?</span>
                  </div>
                </div>

                {/* Login Link */}
                <a
                  href="/login"
                  className="w-full border border-slate-600 text-gray-300 font-semibold py-3 rounded-lg transition hover:bg-slate-700/50 flex items-center justify-center gap-2"
                >
                  Se connecter
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
export default Register;
