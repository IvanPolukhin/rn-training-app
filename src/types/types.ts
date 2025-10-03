export type Photo = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type GalleryState = {
  theme: 'light' | 'dark';
  filter: 'all' | 'landscape' | 'portrait' | 'square';
  sortBy: 'id' | 'author' | 'width' | 'height';
  sortOrder: 'asc' | 'desc';
  favorites: string[];
  setTheme: (theme: 'light' | 'dark') => void;
  setFilter: (filter: 'all' | 'landscape' | 'portrait' | 'square') => void;
  setSortBy: (sortBy: 'id' | 'author' | 'width' | 'height') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  toggleFavorite: (photoId: string) => void;
  isFavorite: (photoId: string) => boolean;
};
