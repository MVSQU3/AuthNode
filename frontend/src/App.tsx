import { Route, Routes } from "react-router";
import Home from "./pages/Home"; // Page publique d'accueil
import Login from "./pages/Login"; // Page publique de connexion
import Dashboard from "./pages/Dashboard"; // Page privée
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import NavBar from "./components/NavBar";
import PublcRoute from "./components/PublicRoute";
import Profil from "./pages/Profil";
import Settings from "./pages/Settings";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  useEffect(() => {
    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <Routes>
        {/* Routes Publiques */}
        <Route
          path="/login"
          element={
            <PublcRoute>
              <Login />
            </PublcRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublcRoute>
              <Register />
            </PublcRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublcRoute>
              <ResetPassword />
            </PublcRoute>
          }
        />
        <Route
          path="/reset-password-confirm/:token"
          element={
            <PublcRoute>
              <ResetPasswordConfirm />
            </PublcRoute>
          }
        />

        {/* Route Protégée : Utilisation du PrivateRoute comme enveloppe */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
