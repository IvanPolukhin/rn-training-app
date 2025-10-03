import { useState, useRef, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Message } from './types';

export const useChatScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Это тестовый чат для демонстрации работы с клавиатурой.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [autoFocus, setAutoFocus] = useState(false);
  const scrollViewRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      setAutoFocus(true);
      return () => setAutoFocus(false);
    }, []),
  );

  const sendMessage = useCallback(() => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Спасибо за сообщение! Это автоматический ответ.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  }, [message]);

  const renderMessage = useCallback(
    (msg: Message) => ({
      id: msg.id,
      text: msg.text,
      isUser: msg.isUser,
      timestamp: msg.timestamp,
    }),
    [],
  );

  return {
    navigation,
    message,
    messages,
    sendMessage,
    scrollViewRef,
    renderMessage,
    setMessage,
    autoFocus,
  };
};
