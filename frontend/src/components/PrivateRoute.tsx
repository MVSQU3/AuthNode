import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router"; // Assurez-vous d'utiliser 'react-router-dom' pour Navigate

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading); // Scénario 1 : Le chargement est en cours
  console.log("log de user et isLoading", user, isLoading);

  if (isLoading) {
    return <Loader2 />;
  } // Scénario 3 : Le chargement est terminé ET l'utilisateur n'est pas connecté

  if (!isLoading && !user) {
    // 🔑 La redirection est bien retournée ici
    return <Navigate to={"/login"} />;
  } // Scénario 2 : L'utilisateur est connecté

  return children;
};

export default PrivateRoute;
