import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { useAppConfig } from './src/hooks/useAppConfig';
import { DynamicNavigator } from './src/navigation/DynamicNavigator';
import { HomeScreen } from './src/screens/HomeScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { ParksScreen } from './src/screens/ParksScreen';
import { ServicesScreen } from './src/screens/ServicesScreen';
import { QRScannerScreen } from './src/screens/QRScannerScreen';
import { ScavengerHuntScreen } from './src/screens/ScavengerHuntScreen';
import { ServiceDetailScreen } from './src/screens/ServiceDetailScreen';
import { ParkGalleryScreen } from './src/screens/ParkGalleryScreen';
import { ParkHistoryScreen } from './src/screens/ParkHistoryScreen';
import { ParksMapScreen } from './src/screens/ParksMapScreen';
import { SearchScreen } from './src/screens/SearchScreen';

const customScreens: Record<string, React.FC<any>> = {
  HomeScreen,
  EventsScreen,
  ParksScreen,
  ServicesScreen,
  QRScannerScreen,
  ScavengerHuntScreen,
  ServiceDetailScreen,
  ParkGalleryScreen,
  ParkHistoryScreen,
  ParksMapScreen,
  SearchScreen,
};

const App: React.FC = () => {
  const config = useAppConfig();

  return (
    <ThemeProvider theme={config.theme}>
      <StatusBar style="light" backgroundColor={config.theme?.colors?.primary || '#154777'} />
      <DynamicNavigator config={config} customScreens={customScreens} />
    </ThemeProvider>
  );
};

export default App;
