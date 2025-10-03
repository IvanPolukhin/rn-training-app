import React from 'react';
import { View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useGalleryScreen } from './useGalleryScreen';
import { styles } from './styles';
import {
  PhotoItem,
  GalleryHeader,
  GalleryFooter,
  ErrorScreen,
} from './components';

const GalleryScreen = () => {
  const {
    navigation,
    theme,
    filteredAndSortedPhotos,
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
  } = useGalleryScreen();

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorScreen error={error} onRetry={refetch} />
      </SafeAreaView>
    );
  }

  const headerData = renderHeader();

  return (
    <SafeAreaView
      style={[styles.container, theme === 'dark' && styles.containerDark]}
    >
      <View style={styles.navigationHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={[styles.title, theme === 'dark' && styles.titleDark]}>
          Галерея картинок
        </Text>
      </View>

      <FlashList
        data={filteredAndSortedPhotos}
        renderItem={({ item }) => {
          const photoData = renderPhoto({ item });
          return (
            <PhotoItem
              item={item}
              aspectRatio={photoData.aspectRatio}
              isFav={photoData.isFav}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        ListHeaderComponent={() => <GalleryHeader {...headerData} />}
        ListFooterComponent={() => <GalleryFooter {...renderFooter()} />}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default GalleryScreen;
