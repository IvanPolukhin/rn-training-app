import * as Keychain from 'react-native-keychain';
import { StoredCredentials } from '../types/types';

const KEYCHAIN_SERVICE = 'CleanTestApp';
const KEYCHAIN_ACCOUNT = 'user_credentials';

export const keychainService = {
  async saveCredentials(credentials: StoredCredentials): Promise<void> {
    try {
      const credentialsString = JSON.stringify(credentials);
      await Keychain.setInternetCredentials(
        KEYCHAIN_SERVICE,
        KEYCHAIN_ACCOUNT,
        credentialsString,
        {
          accessControl:
            Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
        },
      );
    } catch (error) {
      console.error('Ошибка при сохранении в Keychain:', error);
      throw new Error('Не удалось сохранить учетные данные');
    }
  },

  async getCredentials(): Promise<StoredCredentials | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(
        KEYCHAIN_SERVICE,
      );

      if (credentials && credentials.password) {
        return JSON.parse(credentials.password);
      }

      return null;
    } catch (error) {
      console.error('Ошибка при получении из Keychain:', error);
      return null;
    }
  },

  async removeCredentials(): Promise<void> {
    try {
      // @ts-ignore
      await Keychain.resetInternetCredentials(KEYCHAIN_SERVICE);
    } catch (error) {
      console.error('Ошибка при удалении из Keychain:', error);
    }
  },

  async isBiometrySupported(): Promise<boolean> {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      return biometryType !== null;
    } catch (error) {
      console.error('Ошибка при проверке поддержки биометрии:', error);
      return false;
    }
  },

  async getBiometryType(): Promise<string | null> {
    try {
      return await Keychain.getSupportedBiometryType();
    } catch (error) {
      console.error('Ошибка при получении типа биометрии:', error);
      return null;
    }
  },
};
