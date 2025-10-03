import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useLoginScreen } from './useLoginScreen';
import { LoginForm, InfoSection } from './components';

const LoginScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleLogin,
  } = useLoginScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Добро пожаловать!</Text>
        <Text style={styles.subtitle}>Войдите в свой аккаунт</Text>

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          onLogin={handleLogin}
        />

        <InfoSection />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
