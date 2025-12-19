import { Lock, Shield, Zap, ArrowRight, Check } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Authentification
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Sécurisée</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une solution d'authentification simple, rapide et sécurisée pour vos applications. Protégez vos utilisateurs avec les meilleures pratiques de sécurité.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <button className="btn btn-primary btn-lg gap-2">
            Démarrer
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="btn btn-outline btn-lg text-white border-gray-600 hover:bg-slate-800">
            Documentation
          </button>
        </div>

        {/* Hero Image */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 p-12 backdrop-blur">
          <div className="bg-slate-950 rounded-lg p-8 space-y-3 text-left font-mono text-sm">
            <div className="text-green-400">{"// Authentification sécurisée"}</div>
            <div className="text-gray-300">{"const user = await auth.login({"}</div>
            <div className="text-blue-400">{"  email: 'user@example.com',"}</div>
            <div className="text-blue-400">{"  password: 'securePassword'"}</div>
            <div className="text-gray-300">{"});"}</div>
            <div className="text-green-400">{"// ✓ Connexion réussie"}</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Fonctionnalités Principales</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sécurité Avancée</h3>
            <p className="text-gray-400">
              Chiffrement de bout en bout et authentification à deux facteurs pour protéger les comptes utilisateurs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Rapide & Fiable</h3>
            <p className="text-gray-400">
              Temps de réponse ultra-rapide avec une disponibilité garantie à 99.9% pour votre tranquillité.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Conforme & Régulé</h3>
            <p className="text-gray-400">
              Conforme aux normes RGPD et aux meilleures pratiques de sécurité internationales.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Plans Tarifaires</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Plan 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">Gratuit</h3>
            <p className="text-3xl font-bold text-white mb-6">0€<span className="text-lg text-gray-400">/mois</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Jusqu'à 1000 utilisateurs
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Authentification basique
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Support communauté
              </li>
            </ul>
            <button className="btn btn-outline btn-block text-white border-gray-600">Commencer</button>
          </div>

          {/* Plan 2 */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">Populaire</div>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <p className="text-3xl font-bold text-white mb-6">49€<span className="text-lg text-gray-400">/mois</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Utilisateurs illimités
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                2FA & OAuth2
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Support prioritaire
              </li>
            </ul>
            <button className="btn btn-primary btn-block">Commencer</button>
          </div>

          {/* Plan 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-white mb-6">Personnalisé</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Infrastructure privée
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                SLA garanti 99.99%
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-400" />
                Support 24/7
              </li>
            </ul>
            <button className="btn btn-outline btn-block text-white border-gray-600">Nous contacter</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-16 space-y-6">
          <h2 className="text-4xl font-bold text-white">Prêt à commencer ?</h2>
          <p className="text-xl text-blue-100">Créez votre compte gratuitement et découvrez la puissance de NAUTH</p>
          <button className="btn btn-lg btn-ghost text-white gap-2">
            Créer un compte
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 NAUTH. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;