import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView , SafeAreaView, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import { useTheme } from '../hooks/useTheme';
import ChatBubble from './locales/chatbubble';


const Chatbot = ({ navigation }) => {
  const { theme } = useTheme();
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const SERVER_URL = "http://192.168.43.3:3000/chat";

  const bgColor = theme === 'dark' ? '#000' : '#fff';
  const titleColor = theme === 'dark' ? '#fff' : '#222';

  // Simulate bot response (demo only)
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "Tsy afaka mifandray amin'ny serveur 😕",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 2).toString(), sender: "bot", text: "Erreur serveur" },
      ]);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.sender === "user" ? styles.user : styles.bot,
      ]}
    >
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );


  // UI for the chatbot conversation
  const renderChatUI = () => (
    <SafeAreaView style={[styles.chatContainer, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={titleColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: titleColor }]}>Chat with Maki</Text>
        <Ionicons name="refresh" size={22} color={titleColor} style={{ opacity: 0.7 }} />
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Écris ton message..."
            placeholderTextColor={titleColor}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* Fixed bottom navigation */}
      <BottomNavigation navigation={navigation} currentScreen="chatbot"/>
    </SafeAreaView>
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
    marginBottom: 100,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#6CA94F',
    borderRadius: 20,
    padding: 8,
    marginLeft: 6,
  },
  list: { padding: 10 },
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
  },
});

export default Chatbot; 