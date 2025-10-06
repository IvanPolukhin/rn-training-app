import { create } from 'zustand';
import { AuthState } from '../../types/types';
import { keychainService } from '../../services/keychainService';

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,

  login: async (email: string, password: string, rememberMe: boolean) => {
    if (email && password) {
      const userData = { email, rememberMe };

      if (rememberMe) {
        try {
          await keychainService.saveCredentials({
            email,
            password,
            rememberMe,
          });
        } catch (error) {
          console.error('Ошибка при сохранении в Keychain:', error);
        }
      }

      set({ isAuthenticated: true, user: userData });
    }
  },

  logout: async () => {
    try {
      await keychainService.removeCredentials();
    } catch (error) {
      console.error('Ошибка при удалении из Keychain:', error);
    }
    set({ isAuthenticated: false, user: null });
  },

  checkStoredAuth: async () => {
    try {
      const credentials = await keychainService.getCredentials();
      if (credentials && credentials.rememberMe) {
        set({
          isAuthenticated: true,
          user: {
            email: credentials.email,
            rememberMe: credentials.rememberMe,
          },
        });
      }
    } catch (error) {
      console.error(
        'Ошибка при проверке сохраненных данных аутентификации:',
        error,
      );
    }
  },
}));
