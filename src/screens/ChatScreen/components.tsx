import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { InputAreaProps, MessageItemProps } from './types';
import { styles } from './styles';

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => (
  <View
    style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.botMessage,
    ]}
  >
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.timestamp}>
      {message.timestamp.toLocaleTimeString()}
    </Text>
  </View>
);

export const InputArea: React.FC<InputAreaProps> = ({
  message,
  setMessage,
  sendMessage,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.textInput}
      value={message}
      onChangeText={setMessage}
      placeholder="Введите сообщение..."
      multiline
      maxLength={500}
    />
    <TouchableOpacity
      style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
      onPress={sendMessage}
      disabled={!message.trim()}
    >
      <Text style={styles.sendButtonText}>Отправить</Text>
    </TouchableOpacity>
  </View>
);
