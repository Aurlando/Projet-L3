import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ text, isUser }) {
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.bot]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    margin: 8,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#94e29b',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
  },
  text: {
    color: '#fff',
  },
});