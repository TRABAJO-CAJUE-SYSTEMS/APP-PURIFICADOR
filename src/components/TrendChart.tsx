import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

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

interface TrendChartProps {
  trendData: TrendData;
}

const TrendChart: React.FC<TrendChartProps> = ({ trendData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendencia de Sensores</Text>
      <LineChart
        data={{
          labels: trendData.labels,
          datasets: [
            { data: trendData.alcohol },
            { data: trendData.benceno },
            { data: trendData.co },
            { data: trendData.co2 },
            { data: trendData.h2 },
            { data: trendData.humo },
            { data: trendData.nh3 },
          ],
          legend: ['Alcohol', 'Benceno', 'CO', 'CO2', 'H2', 'Humo', 'NH3'],
        }}
        width={screenWidth - 40}
        height={260}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#e0f7fa',
          backgroundGradientTo: '#80deea',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 127, 122, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default TrendChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
