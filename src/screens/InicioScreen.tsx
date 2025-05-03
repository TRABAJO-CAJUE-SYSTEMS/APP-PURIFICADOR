import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import CardSensor from '../components/CardSensor';
import TrendChart from '../components/TrendChart';
import { database, ref, onValue } from '../firebaseConfig';

interface SensorData {
  CO2: number;
  Alcohol: number;
  Benceno: number;
  Humo: number;
  CO: number;
  H2: number;
  NH3: number;
}

interface TrendData {
  labels: string[];
  alcohol: number[];
  benceno: number[];
  co: number[];
  co2: number[];
  h2: number[];
  humo: number[];
  nh3: number[];
}

const InicioScreen: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [trendData, setTrendData] = useState<TrendData>({
    labels: [],
    alcohol: [],
    benceno: [],
    co: [],
    co2: [],
    h2: [],
    humo: [],
    nh3: [],
  });

  useEffect(() => {
    const sensorRef = ref(database, 'sensor/');
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeLabel = `${hours}:${minutes}`;

        setTrendData((prev) => {
          const updatedLabels = [...prev.labels, timeLabel];
          const updatedAlcohol = [...prev.alcohol, parseFloat(data.Alcohol)];
          const updatedBenceno = [...prev.benceno, parseFloat(data.Benceno)];
          const updatedCO = [...prev.co, parseFloat(data.CO)];
          const updatedCO2 = [...prev.co2, parseFloat(data.CO2)];
          const updatedH2 = [...prev.h2, parseFloat(data.H2)];
          const updatedHumo = [...prev.humo, parseFloat(data.Humo)];
          const updatedNH3 = [...prev.nh3, parseFloat(data.NH3)];

          if (updatedLabels.length > 10) {
            updatedLabels.shift();
            updatedAlcohol.shift();
            updatedBenceno.shift();
            updatedCO.shift();
            updatedCO2.shift();
            updatedH2.shift();
            updatedHumo.shift();
            updatedNH3.shift();
          }

          return {
            labels: updatedLabels,
            alcohol: updatedAlcohol,
            benceno: updatedBenceno,
            co: updatedCO,
            co2: updatedCO2,
            h2: updatedH2,
            humo: updatedHumo,
            nh3: updatedNH3,
          };
        });
      }
    });
  }, []);

  if (!sensorData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00AFAA" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Inicio" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.row}>
          <CardSensor title="Calidad de Aire (CO2)" value={sensorData.CO2.toFixed(2)} unit="ppm" status="-" colorStart="#e0f7fa" colorEnd="#00acc1" />
          <CardSensor title="Alcohol" value={sensorData.Alcohol.toFixed(2)} unit="ppm" status="-" colorStart="#ffe0b2" colorEnd="#fb8c00" />
        </View>

        <View style={styles.row}>
          <CardSensor title="Benceno" value={sensorData.Benceno.toFixed(2)} unit="ppm" status="-" colorStart="#ede7f6" colorEnd="#673ab7" />
          <CardSensor title="Humo" value={sensorData.Humo.toFixed(2)} unit="ppm" status="-" colorStart="#e8f5e9" colorEnd="#43a047" />
        </View>

        <View style={styles.row}>
          <CardSensor title="CO (Monóxido)" value={sensorData.CO.toFixed(2)} unit="ppm" status="-" colorStart="#fce4ec" colorEnd="#d81b60" />
          <CardSensor title="H2 (Hidrógeno)" value={sensorData.H2.toFixed(2)} unit="ppm" status="-" colorStart="#e1f5fe" colorEnd="#039be5" />
        </View>

        <View style={styles.row}>
          <CardSensor title="NH3 (Amoniaco)" value={sensorData.NH3.toFixed(2)} unit="ppm" status="-" colorStart="#f3e5f5" colorEnd="#8e24aa" />
        </View>

        <TrendChart trendData={trendData} />
      </ScrollView>
    </View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
});
