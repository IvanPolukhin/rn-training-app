import { create } from 'zustand';
import { GalleryState } from '../types/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      filter: 'all',
      sortBy: 'id',
      sortOrder: 'asc',
      favorites: [],

      setTheme: theme => set({ theme }),
      setFilter: filter => set({ filter }),
      setSortBy: sortBy => set({ sortBy }),
      setSortOrder: sortOrder => set({ sortOrder }),

      toggleFavorite: photoId => {
        const { favorites } = get();
        const newFavorites = favorites.includes(photoId)
          ? favorites.filter(id => id !== photoId)
          : [...favorites, photoId];
        set({ favorites: newFavorites });
      },

      isFavorite: photoId => {
        const { favorites } = get();
        return favorites.includes(photoId);
      },
    }),
    {
      name: 'gallery-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        favorites: state.favorites,
      }),
    },
  ),
);
