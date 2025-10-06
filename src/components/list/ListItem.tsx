import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem as ListItemType } from '../../types/types';

type ListItemProps = {
  item: ListItemType;
};

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <View style={[styles.container, { borderLeftColor: item.color }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.value}>Значение: {item.value}</Text>
      </View>
      <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
    alignSelf: 'center',
  },
});
