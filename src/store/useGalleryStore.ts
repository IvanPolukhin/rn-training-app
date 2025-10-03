import { create } from 'zustand';
import { GalleryState } from '../types/types';

export const useGalleryStore = create<GalleryState>((set, get) => ({
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
}));
