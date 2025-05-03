import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
}

interface RootStackParamList {
  LoginScreen: undefined;
  Ajustes: undefined;
}

export default function Header({ title = 'Inicio' }: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = () => {
    closeMenu();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell-outline" size={24} color="#007F7A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.fullscreenTouchable} onPress={closeMenu} />
          <View style={styles.menu}>
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.avatarBig}
              />
              <View>
                <Text style={styles.userName}>Usuario</Text>
                <Text style={styles.userEmail}>usuario@ejemplo.com</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.menuOption}>
              <Icon name="account-outline" size={20} color="#555" />
              <Text style={styles.menuText}>Mi Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('Ajustes');
              }}
            >
              <Icon name="cog-outline" size={20} color="#555" />
              <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOptionRed} onPress={handleLogout}>
              <Icon name="logout" size={20} color="red" />
              <Text style={styles.menuTextRed}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 44,
    height: 70 + (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 44),
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  iconsContainer: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 15 },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#ccc' },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 44,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menu: { backgroundColor: '#fff', width: 220, borderRadius: 8, padding: 10, elevation: 5 },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  avatarBig: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#ccc' },
  userName: { fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 12, color: '#666' },
  fullscreenTouchable: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  menuOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuText: { marginLeft: 10, fontSize: 16, color: '#555' },
  menuOptionRed: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuTextRed: { marginLeft: 10, fontSize: 16, color: 'red' },
});
