import { create } from "zustand";
import { api } from "../utils/api";

interface User {
  userID: string;
  fullname: string;
  iat: number;
  exp: number;
}

interface UserData {
  fullname?: string;
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  errors?: [];
}
interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  register: (
    data: UserData,
    navigate: (path: string) => void
  ) => Promise<AuthResponse>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  login: (
    data: UserData,
    navigate: (path: string) => void
  ) => Promise<AuthResponse>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,

  setUser: (user: User | null) => {
    set({ user: user });
  },
  register: async (data: UserData, navigate): Promise<AuthResponse> => {
    try {
      await api.post("/auth/register", data);
      // On ne met pas le toast ici si on veut le déclencher dans le composant
      navigate("/login");
      return { success: true };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Erreur lors de l'inscription";
      console.log(message, error);
      return { success: false, message };
    }
  },

  logout: async (navigate) => {
    // 1. Mettre à jour l'état local (côté client)
    set({ user: null });
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Impossible de ce déconnecté", error);
    } finally {
      navigate("/login");
    }
  },

  login: async (data: UserData, navigate): Promise<AuthResponse> => {
    set({ isLoading: true });
    try {
      const res = await api.post("/auth/login", data);
      await get().initializeAuth();
      navigate("/");
      return { success: true, message: res.data.message };
    } catch (error: any) {
      console.log("Erreur lors de la connexion", error);
      const responseData = error.response?.data;
      return {
        success: false,
        message: responseData?.message || "Erreur de connexion",
        errors: responseData?.errors || [],
      };
    } finally {
      set({ isLoading: false });
    }
  },

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/auth/check");
      set({ user: res.data.user });
    } catch (error) {
      console.log("Erreur d'initialization", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
