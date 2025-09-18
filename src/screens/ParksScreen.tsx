import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Colors, Fonts } from '../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const testData = require('../data/testData.json');

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ParksScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Header title="Parks & Recreation" />
      
      <ScrollView style={styles.scrollView}>
        {/* AR Experience Button */}
        <TouchableOpacity 
          style={styles.arButton}
          onPress={() => navigation.navigate('QRScanner')}
        >
          <Text style={styles.arButtonText}>🌳 Start AR Park Experience</Text>
        </TouchableOpacity>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('ParkGallery')}
          >
            <Text style={styles.navButtonText}>📸 Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('ParkHistory')}
          >
            <Text style={styles.navButtonText}>📚 History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('ScavengerHunt')}
          >
            <Text style={styles.navButtonText}>🎯 Hunt</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('ParksMap')}
          >
            <Text style={styles.navButtonText}>🗺️ Map</Text>
          </TouchableOpacity>
        </View>

        {/* Parks List */}
        {testData.parks.map((park: any) => (
          <Card
            key={park.id}
            title={park.name}
            description={park.description}
            image={park.images[0]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  arButton: {
    backgroundColor: Colors.accent,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  arButtonText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.white,
  },
  navButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    width: '48%',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  navButtonText: {
    fontSize: Fonts.sizes.base,
    color: Colors.foreground,
  },
});