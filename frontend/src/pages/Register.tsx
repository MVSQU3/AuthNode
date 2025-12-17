import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";
// styled-components n'est plus nécessaire

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.password) {
      // DaisyUI/Tailwind n'empêche pas l'utilisation d'alertes pour les erreurs de validation
      alert("Veuillez remplir tous les champs."); 
      return;
    }
    await register(formData, navigate);
  };

  return (
    // Conteneur centré utilisant les classes Flex de Tailwind
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      
      {/* Le formulaire est une carte (card) DaisyUI */}
      <form onSubmit={handleSubmit} className="card w-full max-w-sm shadow-2xl bg-white p-8">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
          Créer un compte
        </h2>

        {/* Champ Nom complet */}
        <div className="form-control mb-4">
          <label className="label" htmlFor="fullname-input">
            <span className="label-text">Nom complet</span>
          </label>
          <input
            id="fullname-input"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Nom et Prénom"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Champ Email */}
        <div className="form-control mb-4">
          {/* Note: Dans votre version d'origine, cet input était de type 'password' et n'avait pas de label.
             Correction pour utiliser 'email' et ajouter un label pour l'accessibilité. */}
          <label className="label" htmlFor="email-input">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email-input"
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@mail"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="form-control mb-6">
          <label className="label" htmlFor="password-input">
            <span className="label-text">Mot de passe</span>
          </label>
          <input
            id="password-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
            className="input input-bordered w-full"
          />
          
          {/* Lien de connexion (au lieu d'un label, on utilise un div ou p pour le lien) */}
          <div className="label pt-2">
            <a 
              onClick={() => navigate("/login")} 
              className="label-text-alt link link-hover text-sm text-right w-full"
            >
              Déjà un compte ? Connectez-vous.
            </a>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="form-control mt-4">
          {/* 'btn-secondary' pour l'inscription, 'btn-primary' pour la connexion, pour les différencier */}
          <button type="submit" className="btn btn-secondary btn-md">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;