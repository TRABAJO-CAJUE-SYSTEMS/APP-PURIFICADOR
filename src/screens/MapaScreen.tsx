import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Header from '../components/Header';

interface Ubicacion {
  id: string;
  nombre: string;
  lat: number;
  lon: number;
  aqi: number;
}

const MapaScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const ubicaciones: Ubicacion[] = [
    { id: '1', nombre: 'Queru Queru', lat: -17.3748, lon: -66.1641, aqi: 40 },
    { id: '2', nombre: 'La Recoleta', lat: -17.3845, lon: -66.1568, aqi: 85 },
    { id: '3', nombre: 'Sarco', lat: -17.3752, lon: -66.1703, aqi: 120 },
    { id: '4', nombre: 'Tiquipaya', lat: -17.3555, lon: -66.2396, aqi: 160 },
  ];

  const getMarkerColor = (aqi: number): string => {
    if (aqi <= 50) return '#4CAF50';
    if (aqi <= 100) return '#FFEB3B';
    if (aqi <= 150) return '#FF9800';
    return '#F44336';
  };

  const getAirQualityLevel = (aqi: number): string => {
    if (aqi <= 50) return 'Bueno';
    if (aqi <= 100) return 'Moderado';
    if (aqi <= 150) return 'Dañino';
    return 'Muy Dañino';
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Mapa" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007F7A" />
        </View>
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -17.3895,
              longitude: -66.1568,
              latitudeDelta: 0.08,
              longitudeDelta: 0.08,
            }}
          >
            {ubicaciones.map((lugar) => (
              <Marker
                key={lugar.id}
                coordinate={{ latitude: lugar.lat, longitude: lugar.lon }}
              >
                <View style={[styles.marker, { backgroundColor: getMarkerColor(lugar.aqi) }]}>
                  <Text style={styles.markerText}>{lugar.aqi}</Text>
                </View>
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{lugar.nombre}</Text>
                    <Text style={styles.calloutText}>
                      AQI: {lugar.aqi} ({getAirQualityLevel(lugar.aqi)})
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

          <ScrollView contentContainerStyle={styles.legendContainer}>
            <Text style={styles.legendTitle}>Leyenda Calidad del Aire</Text>

            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Bueno (0–50)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFEB3B' }]} />
              <Text style={styles.legendText}>Moderado (51–100)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Dañino (101–150)</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
              <Text style={styles.legendText}>Muy Dañino (151+)</Text>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default MapaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { width: '100%', height: Dimensions.get('window').height * 0.55 },
  marker: {
    padding: 6,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
  },
  markerText: { color: '#fff', fontWeight: 'bold' },
  callout: { width: 150, alignItems: 'center' },
  calloutTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  calloutText: { fontSize: 14 },
  legendContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: { fontSize: 16, color: '#555' },
});
