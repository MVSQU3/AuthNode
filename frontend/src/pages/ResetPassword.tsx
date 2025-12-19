import React, { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { ArrowRight, Loader2, Mail, MailCheck } from "lucide-react"; // Ajout de MailCheck pour le visuel
import { Link } from "react-router";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // État pour le succès

  const forgotPassword = useUserStore((state) => state.forgotPassword);
  const isLoading = useUserStore((state) => state.isLoading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) {
      setIsSubmitted(true);
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
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Mot de passe oublié ?
                </h2>
                <p className="text-gray-400">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      placeholder="exemple@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le lien
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                Vous vous souvenez de votre mot de passe ?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Se connecter
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <MailCheck className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Vérifiez vos emails
              </h2>
              <p className="text-gray-400 mb-6">
                Si un compte existe pour{" "}
                <span className="font-semibold text-white">{email}</span>, vous
                recevrez un lien de réinitialisation d'ici quelques instants.
              </p>
              <button
                className="btn btn-ghost gap-2 text-gray-300"
                onClick={() => setIsSubmitted(false)}
              >
                Utiliser une autre adresse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
