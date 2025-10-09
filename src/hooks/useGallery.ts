import { useCallback, useMemo } from 'react';
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useGalleryStore } from '../store/useGalleryStore';
import { Photo } from '../types/types';
import { photoService } from '../api/photoService';

export const useGallery = () => {
  const navigation = useNavigation();

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

  const queryKey = useMemo(() => ['photos'], []);

  const {
    data: rawPhotosData,
    isError,
    error,
    isFetching,
    fetchNextPage,
    refetch,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<
    Photo[],
    Error,
    { pages: Photo[]; pageParams: number[] },
    string[],
    number
  >({
    queryKey,

    queryFn: async ({
      pageParam = 1,
    }: QueryFunctionContext<string[], number>) => {
      return await photoService.getPhotos(pageParam, 20);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: true,
  });

  const processedPhotos = useMemo(() => {
    if (!rawPhotosData?.pages) return [];

    const allPhotos = rawPhotosData.pages.flat();

    let filteredPhotos = allPhotos;
    if (filter !== 'all') {
      filteredPhotos = allPhotos.filter(photo => {
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

    return filteredPhotos.sort((a, b) => {
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
          aValue = parseInt(a.id, 10);
          bValue = parseInt(b.id, 10);
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
  }, [rawPhotosData, filter, sortBy, sortOrder]);

  const currentPagePhotos: Photo[] = useMemo(() => {
    if (!rawPhotosData?.pages) return [];

    const lastPage = rawPhotosData.pages[rawPhotosData.pages.length - 1];
    return Array.isArray(lastPage) ? lastPage : [];
  }, [rawPhotosData]);

  const allLoadedPhotos: Photo[] = useMemo(
    () => rawPhotosData?.pages?.flat() ?? [],
    [rawPhotosData],
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const handleToggleFavorite = useCallback(
    (photoId: string) => toggleFavorite(photoId),
    [toggleFavorite],
  );

  const renderPhoto = useCallback(
    ({ item }: { item: Photo }) => {
      const aspectRatio = item.width / item.height;
      const isFav = isFavorite(item.id);
      return { aspectRatio, isFav, item };
    },
    [isFavorite],
  );

  const renderHeader = useCallback(
    () => ({
      filter,
      sortBy,
      sortOrder,
      theme,
      filteredAndSortedPhotosLength: processedPhotos.length,
      photosLength: allLoadedPhotos.length,
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
      processedPhotos.length,
      allLoadedPhotos.length,
      favorites.length,
      setFilter,
      setSortBy,
      setSortOrder,
      setTheme,
    ],
  );

  const renderFooter = useCallback(() => ({ isLoading }), [isLoading]);

  return {
    navigation,
    theme,
    photos: processedPhotos,
    filteredAndSortedPhotos: processedPhotos,
    favorites,
    isLoading,
    isError,
    error,
    isFetching,
    handleRefresh,
    handleLoadMore,
    handleToggleFavorite,
    refetch,
    renderPhoto,
    renderHeader,
    renderFooter,
  };
};
