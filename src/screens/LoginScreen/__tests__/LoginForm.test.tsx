import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginForm } from '../../../components/auth/LoginForm';

const mockProps = {
  email: '',
  setEmail: jest.fn(),
  password: '',
  setPassword: jest.fn(),
  rememberMe: false,
  setRememberMe: jest.fn(),
  onLogin: jest.fn(),
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm {...mockProps} />,
    );

    expect(getByPlaceholderText('Введите email')).toBeTruthy();
    expect(getByPlaceholderText('Введите пароль')).toBeTruthy();
    expect(getByText('Запомнить меня')).toBeTruthy();
    expect(getByText('Войти')).toBeTruthy();
  });

  it('calls setEmail when email input changes', () => {
    const { getByPlaceholderText } = render(<LoginForm {...mockProps} />);
    const emailInput = getByPlaceholderText('Введите email');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(mockProps.setEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('calls setPassword when password input changes', () => {
    const { getByPlaceholderText } = render(<LoginForm {...mockProps} />);
    const passwordInput = getByPlaceholderText('Введите пароль');

    fireEvent.changeText(passwordInput, 'password123');

    expect(mockProps.setPassword).toHaveBeenCalledWith('password123');
  });

  it('calls setRememberMe when switch is toggled', () => {
    const { getByRole } = render(<LoginForm {...mockProps} />);
    const switchElement = getByRole('switch');

    fireEvent(switchElement, 'valueChange', true);

    expect(mockProps.setRememberMe).toHaveBeenCalledWith(true);
  });

  it('calls onLogin when login button is pressed', () => {
    const propsWithValues = {
      ...mockProps,
      email: 'test@example.com',
      password: 'password123',
    };
    const { getByText } = render(<LoginForm {...propsWithValues} />);
    const loginButton = getByText('Войти');

    fireEvent.press(loginButton);

    expect(mockProps.onLogin).toHaveBeenCalledTimes(1);
  });

  it('shows correct email value', () => {
    const { getByDisplayValue } = render(
      <LoginForm {...mockProps} email="test@example.com" />,
    );

    expect(getByDisplayValue('test@example.com')).toBeTruthy();
  });

  it('shows correct password value', () => {
    const { getByDisplayValue } = render(
      <LoginForm {...mockProps} password="password123" />,
    );

    expect(getByDisplayValue('password123')).toBeTruthy();
  });

  it('shows correct remember me state', () => {
    const { getByRole } = render(
      <LoginForm {...mockProps} rememberMe={true} />,
    );

    const switchElement = getByRole('switch');
    expect(switchElement.props.value).toBe(true);
  });
});
