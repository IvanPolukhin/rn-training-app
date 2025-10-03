import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../features/auth/useAuth';

export const useLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, checkStoredAuth } = useAuthStore();

  useEffect(() => {
    checkStoredAuth();
  }, [checkStoredAuth]);

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
    handleLogin,
  };
};
