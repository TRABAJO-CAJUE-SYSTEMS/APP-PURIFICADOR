import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import LoginScreen   from './src/screens/LoginScreen';
import MapaScreen    from './src/screens/MapaScreen';

export type RootStackParamList = {
  LoginScreen:  undefined;
  BottomTabs:   undefined;
  MapaPublico:  undefined;   // ← acceso sin login (RF008)
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen"  component={LoginScreen}         options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabs"   component={BottomTabsNavigator} options={{ headerShown: false }} />
        {/* Mapa público sin autenticación — RF008 */}
        <Stack.Screen
          name="MapaPublico"
          component={MapaScreen}
          options={{
            title: 'Mapa de Calidad del Aire',
            headerStyle: { backgroundColor: '#007F7A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
