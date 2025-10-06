import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { PhotoItemProps } from '../../types/types';

export const PhotoItem: React.FC<PhotoItemProps> = ({
  item,
  aspectRatio,
  isFav,
  onToggleFavorite,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const favoriteScale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(
      Math.random() * 200,
      withTiming(1, { duration: 300 }),
    );
    scale.value = withDelay(
      Math.random() * 200,
      withSpring(1, { damping: 15, stiffness: 150 }),
    );
  }, []);

  const handleFavoritePress = () => {
    favoriteScale.value = withSpring(0.8, { damping: 10 }, () => {
      favoriteScale.value = withSpring(1, { damping: 10 });
    });
    onToggleFavorite(item.id);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const animatedFavoriteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  return (
    <Animated.View
      style={[styles.photoContainer, { aspectRatio }, animatedContainerStyle]}
    >
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
        <Animated.View style={animatedFavoriteStyle}>
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFav && styles.favoriteButtonActive,
            ]}
            onPress={handleFavoritePress}
          >
            <Text style={styles.favoriteIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoInfo: {
    flex: 1,
    marginRight: 8,
  },
  authorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dimensionsText: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.8,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
  },
  favoriteIcon: {
    fontSize: 16,
  },
});
