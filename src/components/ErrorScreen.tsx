import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { ErrorScreenProps } from '../types/types';

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = 'Ошибка',
  message = 'Что-то пошло не так',
  error,
  onRetry,
  retryText = 'Повторить',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{error?.message || message}</Text>
      {onRetry && (
        <Button
          title={retryText}
          onPress={onRetry}
          style={styles.retryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    minWidth: 120,
  },
});
