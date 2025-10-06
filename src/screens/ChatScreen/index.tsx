import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { styles } from './styles';
import { useChat } from '../../hooks';
import { MessageItem, InputArea } from '../../components';

const ChatScreen = () => {
  const {
    navigation,
    message,
    messages,
    sendMessage,
    scrollViewRef,
    setMessage,
    autoFocus,
  } = useChat();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Тест клавиатуры</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Этот чат демонстрирует работу с клавиатурой. Попробуйте ввести
          сообщение и посмотрите, как UI адаптируется к появлению клавиатуры.
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map(message => (
              <MessageItem key={message.id} message={message} />
            ))}
          </ScrollView>

          <InputArea
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            autoFocus={autoFocus}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
