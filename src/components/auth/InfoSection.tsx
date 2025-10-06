import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InfoSectionProps } from '../../types/types';

export const InfoSection: React.FC<InfoSectionProps> = ({
  biometrySupported,
  biometryType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Для демонстрации введите любой email и пароль
      </Text>
      {biometrySupported && (
        <Text style={styles.biometryText}>
          🔐 Биометрия доступна:{' '}
          {biometryType === 'FaceID'
            ? 'Face ID'
            : biometryType === 'TouchID'
            ? 'Touch ID'
            : biometryType || 'Биометрия'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  biometryText: {
    textAlign: 'center',
    color: '#4caf50',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
});
