import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '../Button';
import { InputAreaProps } from '../../types/types';

export const InputArea: React.FC<InputAreaProps> = ({
  message,
  setMessage,
  sendMessage,
  autoFocus = false,
}) => {
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus && textInputRef.current) {
      const timer = setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Введите сообщение..."
        multiline
        maxLength={500}
        textAlignVertical="top"
      />
      <Button
        title="Отправить"
        onPress={sendMessage}
        disabled={!message.trim()}
        style={styles.sendButton}
        variant="secondary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#F2F2F7',
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
});
