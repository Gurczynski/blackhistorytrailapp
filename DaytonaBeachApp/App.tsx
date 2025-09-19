import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Colors } from './src/constants/Colors';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.headerBackground} />
      <AppNavigator />
    </>
  );
};

export default App;