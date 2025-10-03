import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useGalleryStore } from '../../store/useGalleryStore';
import { Photo } from '../../types/types';
import { photoService } from '../../api/photoService';

export const useGalleryScreen = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  const {
    theme,
    filter,
    sortBy,
    sortOrder,
    favorites,
    setTheme,
    setFilter,
    setSortBy,
    setSortOrder,
    toggleFavorite,
    isFavorite,
  } = useGalleryStore();

  const {
    data: photos = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['photos', page],
    queryFn: () => photoService.getPhotos(page, 20),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const filteredAndSortedPhotos = useMemo(() => {
    let filtered = photos;

    if (filter !== 'all') {
      filtered = photos.filter(photo => {
        const aspectRatio = photo.width / photo.height;
        switch (filter) {
          case 'landscape':
            return aspectRatio > 1.2;
          case 'portrait':
            return aspectRatio < 0.8;
          case 'square':
            return aspectRatio >= 0.8 && aspectRatio <= 1.2;
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case 'width':
          aValue = a.width;
          bValue = b.width;
          break;
        case 'height':
          aValue = a.height;
          bValue = b.height;
          break;
        default:
          aValue = parseInt(a.id);
          bValue = parseInt(b.id);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
  }, [photos, filter, sortBy, sortOrder]);

  const handleRefresh = useCallback(async () => {
    setPage(1);
    await refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading) {
      setPage(prev => prev + 1);
    }
  }, [isLoading]);

  const handleToggleFavorite = useCallback(
    (photoId: string) => {
      toggleFavorite(photoId);
    },
    [toggleFavorite],
  );

  const renderPhoto = useCallback(
    ({ item }: { item: Photo }) => {
      const aspectRatio = item.width / item.height;
      const isFav = isFavorite(item.id);

      return {
        aspectRatio,
        isFav,
        item,
      };
    },
    [isFavorite],
  );

  const renderHeader = useCallback(
    () => ({
      filter,
      sortBy,
      sortOrder,
      theme,
      filteredAndSortedPhotosLength: filteredAndSortedPhotos.length,
      photosLength: photos.length,
      favoritesLength: favorites.length,
      setFilter,
      setSortBy,
      setSortOrder,
      setTheme,
    }),
    [
      filter,
      sortBy,
      sortOrder,
      theme,
      filteredAndSortedPhotos.length,
      photos.length,
      favorites.length,
      setFilter,
      setSortBy,
      setSortOrder,
      setTheme,
    ],
  );

  const renderFooter = useCallback(() => {
    return { isLoading };
  }, [isLoading]);

  return {
    // Navigation
    navigation,

    // State
    theme,
    page,
    photos,
    filteredAndSortedPhotos,
    favorites,

    // Query state
    isLoading,
    isError,
    error,
    isFetching,

    // Actions
    handleRefresh,
    handleLoadMore,
    handleToggleFavorite,
    refetch,

    // Render helpers
    renderPhoto,
    renderHeader,
    renderFooter,

    // Store actions
    setTheme,
    setFilter,
    setSortBy,
    setSortOrder,
    toggleFavorite,
    isFavorite,
  };
};
