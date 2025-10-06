export type Photo = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: {
    email: string;
    rememberMe: boolean;
  } | null;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkStoredAuth: () => Promise<void>;
};

export type StoredCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
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

export type GalleryHeaderProps = {
  filter: 'all' | 'landscape' | 'portrait' | 'square';
  sortBy: 'id' | 'author' | 'width' | 'height';
  sortOrder: 'asc' | 'desc';
  theme: 'light' | 'dark';
  filteredAndSortedPhotosLength: number;
  photosLength: number;
  favoritesLength: number;
  setFilter: (filter: 'all' | 'landscape' | 'portrait' | 'square') => void;
  setSortBy: (sortBy: 'id' | 'author' | 'width' | 'height') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

export type PhotoItemProps = {
  item: Photo;
  aspectRatio: number;
  isFav: boolean;
  onToggleFavorite: (photoId: string) => void;
};

export type GalleryFooterProps = {
  isLoading: boolean;
};

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export type MessageItemProps = {
  message: Message;
};

export type InputAreaProps = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  autoFocus?: boolean;
};

export type ListItem = {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  color: string;
};

export type ListFooterProps = {
  isLoadingMore: boolean;
};

export type LoginFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  onLogin: () => void;
  isLoading?: boolean;
};

export type InfoSectionProps = {
  biometrySupported: boolean;
  biometryType: string | null;
};

export type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

export type InputProps = {
  label?: string;
  error?: string;
  containerStyle?: any;
  style?: any;
} & React.ComponentProps<typeof import('react-native').TextInput>;

export type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  style?: any;
};

export type ErrorScreenProps = {
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
  retryText?: string;
  style?: any;
};
