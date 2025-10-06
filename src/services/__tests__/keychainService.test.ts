import * as Keychain from 'react-native-keychain';
import { keychainService } from '../keychainService';

jest.mock('react-native-keychain', () => ({
  setInternetCredentials: jest.fn(),
  getInternetCredentials: jest.fn(),
  resetInternetCredentials: jest.fn(),
  getSupportedBiometryType: jest.fn(),
  ACCESS_CONTROL: {
    BIOMETRY_ANY_OR_DEVICE_PASSCODE: 'BiometryAnyOrDevicePasscode',
  },
  AUTHENTICATION_TYPE: {
    DEVICE_PASSCODE_OR_BIOMETRICS: 'DevicePasscodeOrBiometrics',
  },
  BIOMETRY_TYPE: {
    FACE_ID: 'FaceID',
    TOUCH_ID: 'TouchID',
    FINGERPRINT: 'Fingerprint',
  },
}));

const mockKeychain = Keychain as jest.Mocked<typeof Keychain>;

describe('keychainService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveCredentials', () => {
    it('saves credentials successfully', async () => {
      // @ts-ignore
      mockKeychain.setInternetCredentials.mockResolvedValue();

      const credentials = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };

      await keychainService.saveCredentials(credentials);

      expect(mockKeychain.setInternetCredentials).toHaveBeenCalledWith(
        'CleanTestApp',
        'user_credentials',
        JSON.stringify(credentials),
        {
          accessControl: 'BiometryAnyOrDevicePasscode',
        },
      );
    });

    it('throws error when save fails', async () => {
      const error = new Error('Save failed');
      mockKeychain.setInternetCredentials.mockRejectedValue(error);

      const credentials = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };

      await expect(
        keychainService.saveCredentials(credentials),
      ).rejects.toThrow('Не удалось сохранить учетные данные');
    });
  });

  describe('getCredentials', () => {
    it('returns credentials when found', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };

      mockKeychain.getInternetCredentials.mockResolvedValue({
        service: 'CleanTestApp',
        username: 'user_credentials',
        password: JSON.stringify(credentials),
      } as any);

      const result = await keychainService.getCredentials();

      expect(result).toEqual(credentials);
      expect(mockKeychain.getInternetCredentials).toHaveBeenCalledWith(
        'CleanTestApp',
      );
    });

    it('returns null when no credentials found', async () => {
      mockKeychain.getInternetCredentials.mockResolvedValue(false);

      const result = await keychainService.getCredentials();

      expect(result).toBeNull();
    });

    it('returns null when get fails', async () => {
      mockKeychain.getInternetCredentials.mockRejectedValue(
        new Error('Get failed'),
      );

      const result = await keychainService.getCredentials();

      expect(result).toBeNull();
    });
  });

  describe('removeCredentials', () => {
    it('removes credentials successfully', async () => {
      mockKeychain.resetInternetCredentials.mockResolvedValue();

      await keychainService.removeCredentials();

      expect(mockKeychain.resetInternetCredentials).toHaveBeenCalledWith(
        'CleanTestApp',
      );
    });

    it('handles remove error gracefully', async () => {
      mockKeychain.resetInternetCredentials.mockRejectedValue(
        new Error('Remove failed'),
      );

      await expect(
        keychainService.removeCredentials(),
      ).resolves.toBeUndefined();
    });
  });

  describe('isBiometrySupported', () => {
    it('returns true when biometry is supported', async () => {
      mockKeychain.getSupportedBiometryType.mockResolvedValue(
        Keychain.BIOMETRY_TYPE.FACE_ID,
      );

      const result = await keychainService.isBiometrySupported();

      expect(result).toBe(true);
    });

    it('returns false when biometry is not supported', async () => {
      mockKeychain.getSupportedBiometryType.mockResolvedValue(null);

      const result = await keychainService.isBiometrySupported();

      expect(result).toBe(false);
    });

    it('returns false when check fails', async () => {
      mockKeychain.getSupportedBiometryType.mockRejectedValue(
        new Error('Check failed'),
      );

      const result = await keychainService.isBiometrySupported();

      expect(result).toBe(false);
    });
  });

  describe('getBiometryType', () => {
    it('returns biometry type when available', async () => {
      mockKeychain.getSupportedBiometryType.mockResolvedValue(
        Keychain.BIOMETRY_TYPE.TOUCH_ID,
      );

      const result = await keychainService.getBiometryType();

      expect(result).toBe(Keychain.BIOMETRY_TYPE.TOUCH_ID);
    });

    it('returns null when check fails', async () => {
      mockKeychain.getSupportedBiometryType.mockRejectedValue(
        new Error('Check failed'),
      );

      const result = await keychainService.getBiometryType();

      expect(result).toBeNull();
    });
  });
});
