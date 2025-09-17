import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants';
import { RootStackParamList, MainTabParamList } from '../types';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { ParksScreen } from '../screens/ParksScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { QRScannerScreen } from '../screens/QRScannerScreen';
import { ScavengerHuntScreen } from '../screens/ScavengerHuntScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Events':
              iconName = 'event';
              break;
            case 'Parks':
              iconName = 'park';
              break;
            case 'Services':
              iconName = 'settings';
              break;
            case 'More':
              iconName = 'more-horiz';
              break;
            default:
              iconName = 'help';
          }

          // Special styling for Parks tab (center button)
          if (route.name === 'Parks') {
            return (
              <Icon
                name={iconName}
                size={focused ? 28 : 24}
                color={focused ? Colors.accent : color}
              />
            );
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: Colors.navBackground,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen 
        name="Parks" 
        component={ParksScreen}
        options={{
          tabBarLabel: 'Parks',
          tabBarIconStyle: {
            marginTop: -4,
          },
        }}
      />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="More" component={ServicesScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="ScavengerHunt" component={ScavengerHuntScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};