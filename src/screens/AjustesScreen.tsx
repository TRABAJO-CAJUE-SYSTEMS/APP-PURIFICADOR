import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const AjustesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.text}>Pantalla de Ajuste</Text>
      </View>
    </View>
  );
};

export default AjustesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
