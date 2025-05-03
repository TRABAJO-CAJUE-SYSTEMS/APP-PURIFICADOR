import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../App';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const LoginScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      if (isLogin) {
        // 🔐 Iniciar sesión
        await signInWithEmailAndPassword(auth, email, password);
        navigation.reset({ index: 0, routes: [{ name: 'BottomTabs' }] });
      } else {
        // 🆕 Registro
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('¡Cuenta creada!', 'Ahora puedes iniciar sesión');
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Ingresa tu correo para recuperar la contraseña');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Éxito', 'Correo de recuperación enviado');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>🌀</Text>
        </View>
        <Text style={styles.logoText}>AirPure</Text>
        <Text style={styles.subtitle}>Monitoreo y purificación de calidad de aire</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.activeTab]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !isLogin && styles.activeTab]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {!isLogin && (
          <>
            <TextInput
              style={styles.inputFixed}
              placeholder="Nombre"
              placeholderTextColor="#000"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.inputFixed}
              placeholder="Apellido"
              placeholderTextColor="#000"
              value={surname}
              onChangeText={setSurname}
            />
          </>
        )}
        <TextInput
          style={styles.inputFixed}
          placeholder="Correo electrónico"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputFixed}
          placeholder="Contraseña"
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {isLogin && (
          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text style={styles.dividerText}>o continúa con</Text>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Apple</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>© 2025 AirPure. Todos los derechos reservados</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#007F7A' },
  logoContainer: { alignItems: 'center', marginTop: 40 },
  logoCircle: {
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: { fontSize: 30 },
  logoText: { color: '#ffffff', fontSize: 28, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#ffffff', fontSize: 14, marginTop: 4 },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0f2f1',
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: { color: '#007F7A', fontWeight: 'bold' },
  activeTabText: { color: '#007F7A' },
  formContainer: {
    backgroundColor: '#ffffff',
    margin: 25,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  inputFixed: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 12,
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: '#bbb',
    height: 60,
    width: '100%',
  },
  forgotPassword: { alignItems: 'flex-end', marginTop: 8 },
  forgotPasswordText: { color: '#007F7A', fontSize: 13 },
  button: {
    backgroundColor: '#007F7A',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: '#ffffff', fontWeight: 'bold', textAlign: 'center' },
  divider: { alignItems: 'center', marginVertical: 15 },
  dividerText: { color: '#999', fontSize: 13 },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#999',
  },
});
