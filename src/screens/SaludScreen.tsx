import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { database, ref, onValue, off } from '../firebaseConfig';
import Header from '../components/Header';

interface SensorData {
  CO2: number;
  Humo: number;
  CO: number;
  Alcohol: number;
  Benceno: number;
  NH3: number;
  H2: number;
}

const SaludScreen: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    CO2: 0,
    Humo: 0,
    CO: 0,
    Alcohol: 0,
    Benceno: 0,
    NH3: 0,
    H2: 0,
  });

  useEffect(() => {
    const sensorRef = ref(database, 'sensor/');
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
      }
    });

    return () => off(sensorRef);
  }, []);

  const calcularIndiceSalud = (): number => {
    let score = 100;

    if (sensorData.CO2 > 1500) score -= 30;
    else if (sensorData.CO2 > 1000) score -= 15;

    if (sensorData.Humo > 100) score -= 25;
    else if (sensorData.Humo > 50) score -= 10;

    if (sensorData.CO > 35) score -= 30;
    else if (sensorData.CO > 10) score -= 10;

    if (sensorData.Alcohol > 1.5 || sensorData.Benceno > 1.5 || sensorData.NH3 > 1.5) score -= 25;
    else if (sensorData.Alcohol > 0.5 || sensorData.Benceno > 0.5 || sensorData.NH3 > 0.5) score -= 10;

    if (sensorData.H2 > 100) score -= 10;

    return Math.max(score, 0);
  };

  const indiceSalud = calcularIndiceSalud();

  const clasificarCalidadAire = (): string => {
    if (sensorData.CO2 <= 800 && sensorData.Humo <= 50 && sensorData.CO <= 9) return 'Buena';
    if (sensorData.CO2 <= 1500 && sensorData.Humo <= 100 && sensorData.CO <= 35) return 'Moderada';
    return 'Mala';
  };

  const calidadAire = clasificarCalidadAire();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Salud" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vista General</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Índice de Salud</Text>
            <Text style={styles.cardValue}>{indiceSalud}/100</Text>
            <Text style={styles.cardDescription}>
              {indiceSalud >= 80 ? 'Muy Bueno' : indiceSalud >= 60 ? 'Aceptable' : 'Riesgoso'}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calidad de Aire Interior</Text>
            <Text style={styles.cardValue}>{calidadAire}</Text>
            <Text style={styles.cardDescription}>AQI promedio basado en sensores</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calidad de Aire Detallada</Text>

          <View style={styles.cardSmall}>
            <Text>CO2: {sensorData.CO2.toFixed(0)} ppm</Text>
          </View>
          <View style={styles.cardSmall}>
            <Text>Humo: {sensorData.Humo.toFixed(0)} AQI</Text>
          </View>
          <View style={styles.cardSmall}>
            <Text>CO: {sensorData.CO.toFixed(1)} ppm</Text>
          </View>
          <View style={styles.cardSmall}>
            <Text>
              VOCs: {((sensorData.Alcohol + sensorData.Benceno + sensorData.NH3) / 3).toFixed(2)} ppm
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salud Respiratoria</Text>
          <View style={styles.card}>
            <Text style={styles.cardDescription}>
              {sensorData.Humo <= 50
                ? 'Respiración óptima.'
                : sensorData.Humo <= 100
                ? 'Ligera irritación posible.'
                : 'Riesgo alto de irritación respiratoria.'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calidad de Sueño</Text>
          <View style={styles.card}>
            <Text style={styles.cardDescription}>
              {sensorData.Alcohol + sensorData.NH3 < 1
                ? 'Calidad de sueño buena.'
                : 'Posible impacto en la calidad del sueño.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaludScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { padding: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardSmall: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#007F7A', marginVertical: 8 },
  cardDescription: { fontSize: 14, color: '#555' },
});
