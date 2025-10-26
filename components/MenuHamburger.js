import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MenuHamburger = ({
  visible,
  onClose,
  onEditProfile,
  onChangePassword,
  theme,
  toggleTheme,
  onAbout,
  onLogout,
  userName,
  userEmail,
  isGuest, // ← nouveau prop
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
      <View style={[styles.menu, { backgroundColor: theme === 'dark' ? '#222' : '#fff' }]}>
        {/* User info */}
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme === 'dark' ? '#fff' : '#333' }]}>{userName || 'Utilisateur'}</Text>
          <Text style={[styles.userEmail, { color: theme === 'dark' ? '#ccc' : '#666' }]}>{userEmail || ''}</Text>
        </View>

        {/* Menu items pour utilisateurs enregistrés uniquement */}
        {!isGuest && (
          <>
            <TouchableOpacity style={styles.item} onPress={onEditProfile}>
              <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#222' }]}>Modifier le profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={onChangePassword}>
              <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#222' }]}>Changer mot de passe</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Thème */}
        <View style={styles.itemRow}>
          <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#222' }]}>Thème</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>

        {/* À propos */}
        <TouchableOpacity style={styles.item} onPress={onAbout}>
          <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#222' }]}>À propos</Text>
        </TouchableOpacity>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.item} onPress={onLogout}>
          <Text style={[styles.text, { color: '#F44336', fontWeight: 'bold' }]}>Se déconnecter</Text>
        </TouchableOpacity>

        {/* Bouton fermer */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-start', alignItems: 'flex-start' },
  menu: { marginTop: 50, marginLeft: 0, padding: 20, borderTopRightRadius: 8, borderBottomRightRadius: 8, minWidth: 220 },
  item: { paddingVertical: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  text: { fontSize: 16 },
  closeBtn: { position: 'absolute', top: 10, right: 10 },
  userInfo: { marginBottom: 20 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  userEmail: { fontSize: 14, marginTop: 2 }
});

export default MenuHamburger;
