import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from './types';
import { styles } from './styles';

export const ListItemComponent = ({ item }: { item: ListItem }) => (
  <View style={[styles.listItem, { borderLeftColor: item.color }]}>
    <View style={styles.listItemContent}>
      <Text style={styles.listItemTitle}>{item.title}</Text>
      <Text style={styles.listItemSubtitle}>{item.subtitle}</Text>
      <Text style={styles.listItemValue}>Значение: {item.value}</Text>
    </View>
    <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
  </View>
);

export const ListFooterComponent = ({
  isLoadingMore,
}: {
  isLoadingMore: boolean;
}) => {
  if (!isLoadingMore) return null;

  return (
    <View style={styles.loadingFooter}>
      <ActivityIndicator size="small" color="#007AFF" />
      <Text style={styles.loadingText}>Загрузка...</Text>
    </View>
  );
};
