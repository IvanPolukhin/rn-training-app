import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { useAuthStore } from './features/auth/useAuth';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ScrollTestScreen from './screens/ScrollTestScreen';
import ListTestScreen from './screens/ListTestScreen';
import GalleryScreen from './screens/GalleryScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { isAuthenticated, checkStoredAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkStoredAuth();
      setIsLoading(false);
    };

    initializeAuth();
  }, [checkStoredAuth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isAuthenticated ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Chat" component={ChatScreen} />
                  <Stack.Screen
                    name="ScrollTest"
                    component={ScrollTestScreen}
                  />
                  <Stack.Screen name="ListTest" component={ListTestScreen} />
                  <Stack.Screen name="Gallery" component={GalleryScreen} />
                </>
              ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
