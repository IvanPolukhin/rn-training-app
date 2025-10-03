import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Photo } from '../../types/types';
import { styles } from './styles';

interface PhotoItemProps {
  item: Photo;
  aspectRatio: number;
  isFav: boolean;
  onToggleFavorite: (photoId: string) => void;
}

export const PhotoItem: React.FC<PhotoItemProps> = ({
  item,
  aspectRatio,
  isFav,
  onToggleFavorite,
}) => (
  <View style={[styles.photoContainer, { aspectRatio }]}>
    <Image
      source={{ uri: item.download_url }}
      style={styles.photo}
      resizeMode="cover"
    />
    <View style={styles.photoOverlay}>
      <View style={styles.photoInfo}>
        <Text style={styles.authorText} numberOfLines={1}>
          {item.author}
        </Text>
        <Text style={styles.dimensionsText}>
          {item.width} × {item.height}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.favoriteButton, isFav && styles.favoriteButtonActive]}
        onPress={() => onToggleFavorite(item.id)}
      >
        <Text style={styles.favoriteIcon}>{isFav ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

interface HeaderProps {
  filter: string;
  sortBy: string;
  sortOrder: string;
  theme: string;
  filteredAndSortedPhotosLength: number;
  photosLength: number;
  favoritesLength: number;
  setFilter: (filter: any) => void;
  setSortBy: (sortBy: any) => void;
  setSortOrder: (sortOrder: any) => void;
  setTheme: (theme: any) => void;
}

export const GalleryHeader: React.FC<HeaderProps> = ({
  filter,
  sortBy,
  sortOrder,
  theme,
  filteredAndSortedPhotosLength,
  photosLength,
  favoritesLength,
  setFilter,
  setSortBy,
  setSortOrder,
  setTheme,
}) => (
  <View style={styles.header}>
    <View style={styles.controls}>
      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Фильтр:</Text>
        <View style={styles.controlButtons}>
          {['all', 'landscape', 'portrait', 'square'].map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[
                styles.controlButton,
                filter === filterType && styles.controlButtonActive,
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text
                style={[
                  styles.controlButtonText,
                  filter === filterType && styles.controlButtonTextActive,
                ]}
              >
                {filterType === 'all'
                  ? 'Все'
                  : filterType === 'landscape'
                  ? 'Пейзаж'
                  : filterType === 'portrait'
                  ? 'Портрет'
                  : 'Квадрат'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Сортировка:</Text>
        <View style={styles.controlButtons}>
          {['id', 'author', 'width', 'height'].map(sortType => (
            <TouchableOpacity
              key={sortType}
              style={[
                styles.controlButton,
                sortBy === sortType && styles.controlButtonActive,
              ]}
              onPress={() => setSortBy(sortType)}
            >
              <Text
                style={[
                  styles.controlButtonText,
                  sortBy === sortType && styles.controlButtonTextActive,
                ]}
              >
                {sortType === 'id'
                  ? 'ID'
                  : sortType === 'author'
                  ? 'Автор'
                  : sortType === 'width'
                  ? 'Ширина'
                  : 'Высота'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlGroup}>
        <TouchableOpacity
          style={styles.sortOrderButton}
          onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <Text style={styles.sortOrderText}>
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Text style={styles.themeText}>
            {theme === 'light' ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.stats}>
      <Text style={styles.statsText}>
        Показано: {filteredAndSortedPhotosLength} из {photosLength}
      </Text>
      <Text style={styles.statsText}>Избранное: {favoritesLength}</Text>
    </View>
  </View>
);

interface FooterProps {
  isLoading: boolean;
}

export const GalleryFooter: React.FC<FooterProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.loadingFooter}>
      <ActivityIndicator size="small" color="#007AFF" />
      <Text style={styles.loadingText}>Загрузка...</Text>
    </View>
  );
};

interface ErrorScreenProps {
  error: Error | null;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Ошибка загрузки</Text>
    <Text style={styles.errorText}>
      {error?.message || 'Не удалось загрузить фотографии'}
    </Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>Повторить</Text>
    </TouchableOpacity>
  </View>
);
