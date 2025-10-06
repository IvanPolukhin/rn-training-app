import { renderHook, act, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useLogin } from '../../../hooks/useLogin';
import { useAuthStore } from '../../../features/auth/useAuth';
import { keychainService } from '../../../services/keychainService';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock('../../../features/auth/useAuth', () => ({
  useAuthStore: jest.fn(),
}));
jest.mock('../../../services/keychainService');

const mockUseAuthStore = useAuthStore as jest.MockedFunction<
  typeof useAuthStore
>;
const mockKeychainService = keychainService as jest.Mocked<
  typeof keychainService
>;

describe('useLoginScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
    } as any);

    mockKeychainService.isBiometrySupported.mockResolvedValue(true);
    mockKeychainService.getBiometryType.mockResolvedValue('FaceID');
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.rememberMe).toBe(false);
    expect(result.current.biometrySupported).toBe(false);
    expect(result.current.biometryType).toBe(null);
  });

  it('calls checkBiometrySupport on mount', async () => {
    renderHook(() => useLogin());

    await waitFor(() => {
      expect(mockKeychainService.isBiometrySupported).toHaveBeenCalledTimes(1);
      expect(mockKeychainService.getBiometryType).toHaveBeenCalledTimes(1);
    });
  });

  it('updates email when setEmail is called', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('updates password when setPassword is called', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setPassword('password123');
    });

    expect(result.current.password).toBe('password123');
  });

  it('updates rememberMe when setRememberMe is called', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setRememberMe(true);
    });

    expect(result.current.rememberMe).toBe(true);
  });

  it('shows alert when email is empty', async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Ошибка',
      'Пожалуйста, заполните все поля',
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows alert when password is empty', async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Ошибка',
      'Пожалуйста, заполните все поля',
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows alert when email is invalid', async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('invalid-email');
      result.current.setPassword('password123');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Ошибка',
      'Пожалуйста, введите корректный email',
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login with correct parameters when validation passes', async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setRememberMe(true);
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockLogin).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      true,
    );
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('shows error alert when login fails', async () => {
    const { result } = renderHook(() => useLogin());

    mockLogin.mockRejectedValue(new Error('Login failed'));

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Ошибка',
      'Не удалось войти в систему',
    );
  });

  it('updates biometry state when checkBiometrySupport completes', async () => {
    const { result } = renderHook(() => useLogin());

    await waitFor(() => {
      expect(result.current.biometrySupported).toBe(true);
      expect(result.current.biometryType).toBe('FaceID');
    });
  });
});
