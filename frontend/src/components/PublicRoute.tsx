import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router"; // Assurez-vous d'utiliser 'react-router-dom' pour Navigate

interface PublcRouteProps {
  children: React.ReactNode;
}

const PublcRoute: React.FC<PublcRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
      return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
  }

  if (!isLoading && user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PublcRoute;
