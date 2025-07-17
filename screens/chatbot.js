import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import { useTheme } from '../hooks/useTheme';
import ChatBubble from './locales/chatbubble';

const initialBotMessage = {
  text: "Tongasoa! Maki aho, ny mpanampy anao amin'ny fianarana Malagasy. Manao ahoana ianao? 🦩\n\n(Hello! I'm Maki, your Malagasy learning assistant. How are you?)",
  isUser: false,
  time: new Date(),
};

const quickReplies = [
  'Misaotra',
  'Manao ahoana?',
  'Ampianaro ahy',
];

const Chatbot = ({ navigation }) => {
  const { theme } = useTheme();
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState('');

  const bgColor = theme === 'dark' ? '#000' : '#fff';
  const titleColor = theme === 'dark' ? '#fff' : '#222';

  // Simulate bot response (demo only)
  const handleSend = (msg) => {
    if (!msg.trim()) return;
    const userMsg = { text: msg, isUser: true, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "(Démo) Maki: J'ai bien reçu : " + msg,
          isUser: false,
          time: new Date(),
        },
      ]);
    }, 800);
  };

  // UI for the chatbot conversation
  const renderChatUI = () => (
    <View style={[styles.chatContainer, { backgroundColor: bgColor }]}>  
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={titleColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: titleColor }]}>Chat with Maki</Text>
        <Ionicons name="refresh" size={22} color={titleColor} style={{ opacity: 0.7 }} />
      </View>
      {/* Bot status */}
      <View style={styles.statusRow}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Online</Text>
      </View>
      {/* Chat bubbles */}
      <ScrollView style={styles.messages} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} text={msg.text} isUser={msg.isUser} />
        ))}
        <Text style={styles.timeText}>{messages[0].time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </ScrollView>
      {/* Quick replies */}
      <View style={styles.quickRepliesRow}>
        {quickReplies.map((reply, i) => (
          <TouchableOpacity
            key={i}
            style={styles.quickReplyBtn}
            onPress={() => handleSend(reply)}
          >
            <Text style={styles.quickReplyText}>{reply}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message in Malagasy or French..."
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend(input)}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend(input)}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* Fixed bottom navigation */}
      <BottomNavigation navigation={navigation} currentScreen="chatbot" />
    </View>
  );

  // UI before starting the chat
  if (!started) {
    return (
      <View style={[styles.introContainer, { backgroundColor: bgColor }]}>  
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={titleColor} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: titleColor }]}>ChatBot</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.introContent}>
          <Text style={styles.title}>Assistant IA</Text>
          <Text style={styles.subtitle}>Pratiquez le Malagasy avec notre chatbot</Text>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Fonctionnalités</Text>
            <Text style={styles.featureText}>• Conversations en Malagasy</Text>
            <Text style={styles.featureText}>• Correction de grammaire</Text>
            <Text style={styles.featureText}>• Suggestions de vocabulaire</Text>
            <Text style={styles.featureText}>• Exercices interactifs</Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={() => setStarted(true)}>
            <Text style={styles.startButtonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
        {/* Fixed bottom navigation */}
        <BottomNavigation navigation={navigation} currentScreen="chatbot" />
      </View>
    );
  }

  // Chat UI
  return renderChatUI();
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  introContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    marginBottom: 40,
    textAlign: 'center',
  },
  featureCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#6CA94F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Chat UI styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6CA94F',
    marginRight: 6,
  },
  statusText: {
    color: '#6CA94F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messages: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    maxHeight: 320,
  },
  timeText: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
  quickRepliesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  quickReplyBtn: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 12,
    marginHorizontal: 4,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  quickReplyText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
  },
  sendBtn: {
    backgroundColor: '#6CA94F',
    borderRadius: 20,
    padding: 8,
    marginLeft: 6,
  },
});

export default Chatbot; 