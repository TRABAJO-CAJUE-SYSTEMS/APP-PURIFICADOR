import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import DeviceCard from '../components/DeviceCard';

interface Device {
  id: string;
  nombre: string;
  modelo: string;
  encendido: boolean;
  velocidad: number;
  modo: string;
  calidad_aire: string;
  vida_filtro: number;
}

const DispositivosScreen: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([{
    id: '1', nombre: 'Purificador America', modelo: 'AirPure Pro 2000', encendido: true, velocidad: 75,
    modo: 'Automático', calidad_aire: 'Buena', vida_filtro: 85,
  }, {
    id: '2', nombre: 'Purificador Botadero de Kara Kara', modelo: 'AirPure Compact 1000', encendido: true, velocidad: 50,
    modo: 'Nocturno', calidad_aire: 'Buena', vida_filtro: 92,
  }, {
    id: '3', nombre: 'Purificador Tiquipaya', modelo: 'AirPure Kitchen 1500', encendido: false, velocidad: 65,
    modo: 'Intensivo', calidad_aire: 'Moderada', vida_filtro: 22,
  }]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevoModelo, setNuevoModelo] = useState<string>('');

  const agregarDispositivo = () => {
    if (!nuevoNombre || !nuevoModelo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const nuevoDispositivo: Device = {
      id: (devices.length + 1).toString(),
      nombre: nuevoNombre,
      modelo: nuevoModelo,
      encendido: false,
      velocidad: 50,
      modo: 'Automático',
      calidad_aire: 'Buena',
      vida_filtro: 100,
    };

    setDevices([...devices, nuevoDispositivo]);
    setNuevoNombre('');
    setNuevoModelo('');
    setModalVisible(false);
  };

  const actualizarEstado = (id: string, nuevoEstado: boolean) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, encendido: nuevoEstado } : device
      )
    );
  };

  const actualizarVelocidad = (id: string, nuevaVelocidad: number) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, velocidad: nuevaVelocidad } : device
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Dispositivos" />

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>

        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeviceCard
              device={item}
              onToggle={(nuevoEstado) => actualizarEstado(item.id, nuevoEstado)}
              onSliderChange={(nuevoValor) => actualizarVelocidad(item.id, nuevoValor)}
            />
          )}
          contentContainerStyle={styles.list}
        />

        <Modal
          transparent
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Agregar Dispositivo</Text>
              <TextInput
                placeholder="Nombre del dispositivo"
                value={nuevoNombre}
                onChangeText={setNuevoNombre}
                style={styles.input}
              />
              <TextInput
                placeholder="Modelo"
                value={nuevoModelo}
                onChangeText={setNuevoModelo}
                style={styles.input}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={agregarDispositivo}>
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'red' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default DispositivosScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1 },
  addButton: {
    backgroundColor: '#007F7A',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  list: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#007F7A',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});
