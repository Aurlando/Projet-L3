// components/MenuHamburger.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MenuHamburger = ({ visible, onClose, onEditProfile, onChangePassword, theme, toggleTheme, onAbout, onLogout, userName, userEmail }) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
      <View style={styles.menu}>
        {/* User info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Utilisateur'}</Text>
          <Text style={styles.userEmail}>{userEmail || ''}</Text>
        </View>
        {/* Menu items */}
        <TouchableOpacity style={styles.item} onPress={onEditProfile}>
          <Text style={styles.text}>Modifier le profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={onChangePassword}>
          <Text style={styles.text}>Changer mot de passe</Text>
        </TouchableOpacity>
        <View style={styles.itemRow}>
          <Text style={styles.text}>Thème</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
        <TouchableOpacity style={styles.item} onPress={onAbout}>
          <Text style={styles.text}>À propos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={onLogout}>
          <Text style={[styles.text, { color: '#F44336', fontWeight: 'bold' }]}>Se déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-start', alignItems: 'flex-start' },
  menu: { marginTop: 50, marginLeft: 0, backgroundColor: '#fff', padding: 20, borderTopRightRadius: 8, borderBottomRightRadius: 8, minWidth: 220 },
  item: { paddingVertical: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  text: { fontSize: 16, color: '#222' },
  closeBtn: { position: 'absolute', top: 10, right: 10 },
  userInfo: { marginBottom: 20 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#666', marginTop: 2 }
});

export default MenuHamburger;
