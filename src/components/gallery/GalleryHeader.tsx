import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GalleryHeaderProps } from '../../types/types';

const AnimatedButton: React.FC<{
  children: React.ReactNode;
  onPress: () => void;
  style: any;
  activeStyle?: any;
  isActive: boolean;
}> = ({ children, onPress, style, activeStyle, isActive }) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(0.95, { damping: 10 }, () => {
      scale.value = withSpring(1, { damping: 10 });
    });
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[style, isActive && activeStyle]}
        onPress={handlePress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
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
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.controls}>
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Фильтр:</Text>
          <View style={styles.controlButtons}>
            {(['all', 'landscape', 'portrait', 'square'] as const).map(
              filterType => (
                <AnimatedButton
                  key={filterType}
                  style={styles.controlButton}
                  activeStyle={styles.controlButtonActive}
                  isActive={filter === filterType}
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
                </AnimatedButton>
              ),
            )}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Сортировка:</Text>
          <View style={styles.controlButtons}>
            {(['id', 'author', 'width', 'height'] as const).map(sortType => (
              <AnimatedButton
                key={sortType}
                style={styles.controlButton}
                activeStyle={styles.controlButtonActive}
                isActive={sortBy === sortType}
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
              </AnimatedButton>
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <AnimatedButton
            style={styles.sortOrderButton}
            isActive={false}
            onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <Text style={styles.sortOrderText}>
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Text>
          </AnimatedButton>
          <AnimatedButton
            style={styles.themeButton}
            isActive={false}
            onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Text style={styles.themeText}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Text>
          </AnimatedButton>
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
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  controls: {
    marginBottom: 12,
  },
  controlGroup: {
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  controlButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  controlButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  controlButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  controlButtonTextActive: {
    color: '#FFFFFF',
  },
  sortOrderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sortOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  themeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});
