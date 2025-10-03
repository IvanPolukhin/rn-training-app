import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from './types';
import { AUTH_STORAGE_KEY } from './constants';

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,

  login: async (email: string, password: string, rememberMe: boolean) => {
    if (email && password) {
      const userData = { email, rememberMe };

      if (rememberMe) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      }

      set({ isAuthenticated: true, user: userData });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    set({ isAuthenticated: false, user: null });
  },

  checkStoredAuth: async () => {
    try {
      const storedData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedData) {
        const userData = JSON.parse(storedData);
        set({ isAuthenticated: true, user: userData });
      }
    } catch (error) {
      console.error(
        'Ошибка при проверке сохраненных данных аутентификации:',
        error,
      );
    }
  },
}));
