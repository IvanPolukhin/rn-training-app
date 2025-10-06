import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LoadingSpinnerProps } from '../types/types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'small',
  color = '#007AFF',
  text,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: '#8E8E93',
  },
});
