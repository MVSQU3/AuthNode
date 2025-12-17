import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData, navigate);
  };
  
  return (
    // Conteneur centré utilisant les classes Flex de Tailwind
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      
      {/* Le formulaire lui-même est une carte (card) DaisyUI.
        Les classes 'shadow-xl', 'bg-white', et 'p-8' définissent l'apparence. 
      */}
      <form onSubmit={handleSubmit} className="card w-full max-w-sm shadow-2xl bg-white p-8">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Connexion
        </h2>

        {/* Champ Email */}
        <div className="form-control mb-4">
          <label className="label">
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
            // Classes DaisyUI pour l'input (input-bordered) et classes Tailwind pour la couleur/taille
            className="input input-bordered w-full"
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="form-control mb-6">
          <label className="label">
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
            // Classes DaisyUI pour l'input (input-bordered)
            className="input input-bordered w-full"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="form-control mt-4">
          {/* Classes DaisyUI pour le bouton (btn-primary, btn-md) */}
          <button type="submit" className="btn btn-primary btn-md">
            Se connecter
          </button>
        </div>
      </form>
      
      {/* Lien d'inscription en bas de la carte */}
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          Pas encore de compte ? 
        </span>
        {/* 'link-primary' est une classe utilitaire de DaisyUI pour les liens */}
        <Link to={"/register"} className="link link-primary font-semibold ml-1">
          S'inscrire.
        </Link>
      </div>

    </div>
  );
};

export default Login;