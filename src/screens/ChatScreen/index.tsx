import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useChatScreen } from './useChatScreen';
import { MessageItem, InputArea } from './components';

const ChatScreen = () => {
  const {
    navigation,
    message,
    messages,
    sendMessage,
    scrollViewRef,
    setMessage,
  } = useChatScreen();

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
