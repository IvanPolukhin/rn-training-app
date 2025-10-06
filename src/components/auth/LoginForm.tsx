import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Input } from '../Input';
import { Button } from '../Button';
import { LoginFormProps } from '../../types/types';

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  onLogin,
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Введите email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />

      <Input
        label="Пароль"
        value={password}
        onChangeText={setPassword}
        placeholder="Введите пароль"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
      />

      <View style={styles.rememberMeContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={rememberMe ? '#f5dd4b' : '#f4f3f4'}
        />
        <Text style={styles.rememberMeText}>Запомнить меня</Text>
      </View>

      <Button
        title="Войти"
        onPress={onLogin}
        disabled={isLoading || !email || !password}
        style={styles.loginButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
  },
  loginButton: {
    marginTop: 8,
  },
});
