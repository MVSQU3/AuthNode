import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Vérifie si c'est un 401 ET non l'appel de rafraîchissement lui-même
    if (error.response.status === 401 && error.config.url !== "/auth/refresh") {
      try {
        // Tente de rafraîchir le jeton (envoie le Refresh Token du cookie)
        await api.post("/auth/refresh");

        // Si réussi, le nouveau Access Token est dans un nouveau cookie

        // 2. Ré-exécute la requête initiale avec la configuration complète
        // Le nouveau cookie sera automatiquement inclus.
        return api(error.config);
      } catch (refreshError) {
        // 3. Échec critique : Déconnexion forcée !
        useAuthStore.getState().logout;
        // Rejette l'erreur initiale
        return Promise.reject(refreshError);
      }
    }

    // Pour toutes les autres erreurs (400, 500, etc.)
    return Promise.reject(error);
  }
);
