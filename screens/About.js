import React from 'react';
import { View, Text } from 'react-native';

export default function About() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>À propos de l'application</Text>
      <Text style={{ marginTop: 10 }}>
        Hiteny - Apprenez le malgache et découvrez Madagascar. Application réalisée dans le cadre du projet L3 IGGLIA.
      </Text>
    </View>
  );
} 