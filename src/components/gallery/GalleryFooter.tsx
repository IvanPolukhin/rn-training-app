import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoadingSpinner } from '../LoadingSpinner';
import { GalleryFooterProps } from '../../types/types';

export const GalleryFooter: React.FC<GalleryFooterProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <LoadingSpinner text="Загрузка..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
