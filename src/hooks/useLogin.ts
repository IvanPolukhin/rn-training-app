import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../features/auth/useAuth';
import { keychainService } from '../services/keychainService';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [biometrySupported, setBiometrySupported] = useState(false);
  const [biometryType, setBiometryType] = useState<string | null>(null);
  const { login } = useAuthStore();

  useEffect(() => {
    checkBiometrySupport();
  }, []);

  const checkBiometrySupport = async () => {
    try {
      const supported = await keychainService.isBiometrySupported();
      const type = await keychainService.getBiometryType();
      setBiometrySupported(supported);
      setBiometryType(type);
    } catch (error) {
      console.error('Ошибка при проверке биометрии:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректный email');
      return;
    }

    try {
      await login(email, password, rememberMe);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось войти в систему');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    biometrySupported,
    biometryType,
    handleLogin,
  };
};
