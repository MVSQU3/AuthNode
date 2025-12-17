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

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  register: (data: UserData, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  login: (data: UserData, navigate: (path: string) => void) => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,

  setUser: (user: User | null) => {
    set({ user: user });
  },
  register: async (data: UserData, navigate) => {
    try {
      await api.post("/auth/register", data);
      navigate("/login");
    } catch (error) {
      console.log("Erreur lors de la connexion", error);
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

  login: async (data: UserData, navigate) => {
    try {
      await api.post("/auth/login", data);
      await get().initializeAuth();
      navigate("/");
    } catch (error) {
      console.log("Erreur lors de la connexion", error);
    } finally {
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
