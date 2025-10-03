import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { styles } from './styles';
import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  onLogin,
}) => (
  <View style={styles.form}>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />

    <TextInput
      style={styles.input}
      placeholder="Пароль"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
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

    <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
      <Text style={styles.loginButtonText}>Войти</Text>
    </TouchableOpacity>
  </View>
);

export const InfoSection: React.FC = () => (
  <View style={styles.info}>
    <Text style={styles.infoText}>
      Для демонстрации введите любой email и пароль
    </Text>
  </View>
);
