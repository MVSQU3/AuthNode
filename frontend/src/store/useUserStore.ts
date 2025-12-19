import { create } from "zustand";
import { api } from "../utils/api";

interface ResetCredentials {
  newPassword: string;
  confirmPassword: string;
}

interface UserState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
  userDelProfile: () => Promise<void>;
  changePassword: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPasswordConfirm: (
    ResetCredentials: ResetCredentials,
    token: string | undefined
  ) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  success: false,
  error: null,
  userDelProfile: async (): Promise<void> => {},
  changePassword: async (): Promise<void> => {},
  forgotPassword: async (email: string): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      // On précise le type de la réponse attendue si possible
      await api.post<{ success: boolean; message: string }>(
        "/user/reset-password",
        { email }
      );

      set({ isLoading: false });
      return true; // Succès : l'email est envoyé
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Une erreur est survenue";
      set({ isLoading: false, error: errorMessage });
      return false; // Échec
    }
  },
  resetPasswordConfirm: async (
    data: ResetCredentials,
    token: string | undefined
  ): Promise<boolean> => {
    if (!token) return false;

    set({ isLoading: true, error: null });
    try {
      // On type la réponse attendue
      await api.post<{ success: boolean; message: string }>(
        `/user/reset-password-confirm/${token}`,
        {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }
      );

      set({ isLoading: false });
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erreur de réinitialisation";
      set({ isLoading: false, error: msg });
      return false;
    }
  },
}));
