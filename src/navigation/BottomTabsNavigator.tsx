import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from '../screens/InicioScreen';
import DispositivosScreen from '../screens/DispositivosScreen';
import ZonasScreen from '../screens/ZonasScreen';
import MapaScreen from '../screens/MapaScreen';
import SaludScreen from '../screens/SaludScreen';
import AjustesScreen from '../screens/AjustesScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type BottomTabsParamList = {
  Inicio: undefined;
  Dispositivos: undefined;
  Zonas: undefined;
  Mapa: undefined;
  Salud: undefined;
  Ajustes: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Inicio':
              iconName = 'home-outline';
              break;
            case 'Dispositivos':
              iconName = 'air-filter';
              break;
            case 'Zonas':
              iconName = 'view-grid-outline';
              break;
            case 'Mapa':
              iconName = 'map-outline';
              break;
            case 'Salud':
              iconName = 'heart-pulse';
              break;
            case 'Ajustes':
              iconName = 'cog-outline';
              break;
            default:
              iconName = 'circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00AFAA',   // Color activo
        tabBarInactiveTintColor: 'gray',    // Color inactivo
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Dispositivos" component={DispositivosScreen} />
      <Tab.Screen name="Zonas" component={ZonasScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Salud" component={SaludScreen} />
      <Tab.Screen name="Ajustes" component={AjustesScreen} />
    </Tab.Navigator>
  );
}