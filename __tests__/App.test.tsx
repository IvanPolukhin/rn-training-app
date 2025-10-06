/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/App';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }: { children: React.ReactNode }) =>
    children,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ children }: { children: React.ReactNode }) => children,
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(() => ({
    setQueryData: jest.fn(),
    getQueryData: jest.fn(),
    invalidateQueries: jest.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('react-native-keyboard-controller', () => ({
  KeyboardProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@shopify/flash-list', () => ({
  FlashList: 'FlashList',
}));

jest.mock('react-native-worklets', () => ({
  createSerializable: jest.fn(),
  runOnJS: jest.fn(fn => fn),
  runOnUI: jest.fn(fn => fn),
}));

jest.mock('react-native-reanimated', () => ({
  default: {
    View: 'Animated.View',
    Text: 'Animated.Text',
    Image: 'Animated.Image',
    ScrollView: 'Animated.ScrollView',
    FlatList: 'Animated.FlatList',
  },
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  withTiming: jest.fn(val => val),
  withSpring: jest.fn(val => val),
  withDelay: jest.fn((_, val) => val),
  runOnJS: jest.fn(fn => fn),
  useAnimatedReaction: jest.fn(),
  useDerivedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedScrollHandler: jest.fn(() => ({
    onScroll: jest.fn(),
    onBeginDrag: jest.fn(),
    onEndDrag: jest.fn(),
    onMomentumBegin: jest.fn(),
    onMomentumEnd: jest.fn(),
  })),
  useAnimatedKeyboard: jest.fn(() => ({
    height: { value: 0 },
    state: { value: 0 },
    progress: { value: 0 },
    open: { value: false },
    closed: { value: true },
    onKeyboardMove: jest.fn(),
    onKeyboardMoveStart: jest.fn(),
    onKeyboardMoveEnd: jest.fn(),
    onKeyboardMoveInterrupt: jest.fn(),
    subscribe: jest.fn(),
    destroy: jest.fn(),
  })),
}));

jest.mock('../src/features/auth/useAuth', () => ({
  useAuthStore: () => ({
    isAuthenticated: false,
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    checkStoredAuth: jest.fn(),
  }),
}));

test('renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText).toBeDefined();
});
