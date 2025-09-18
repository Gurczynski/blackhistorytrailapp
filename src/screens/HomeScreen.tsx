import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Colors, Fonts } from '../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Import test data
const testData = require('../data/testData.json');

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = () => {
    navigation.navigate('SearchResults', { query: '' });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Daytona Beach"
        showSearch
        onSearchPress={handleSearch}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/400x200/FAA21B/FFFFFF?text=Summer+Music+Festival',
            }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Summer Music Festival</Text>
            <Text style={styles.bannerSubtitle}>July 23 • Main Street Beach</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* City Highlights Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>City Highlights</Text>
          
          {testData.cityHighlights.map((highlight: any) => (
            <Card
              key={highlight.id}
              title={highlight.title}
              description={highlight.excerpt}
              image={highlight.image}
              onPress={() => {
                // Navigate to detailed view
                console.log('Navigate to highlight:', highlight.id);
              }}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Services' as any)}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>💳</Text>
              </View>
              <Text style={styles.quickActionTitle}>Pay Bills</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Services' as any)}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📋</Text>
              </View>
              <Text style={styles.quickActionTitle}>Permits</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Parks' as any)}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>🌳</Text>
              </View>
              <Text style={styles.quickActionTitle}>Parks</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Events' as any)}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📅</Text>
              </View>
              <Text style={styles.quickActionTitle}>Events</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  bannerContainer: {
    height: 250,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  bannerTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: Fonts.sizes.base,
    color: Colors.white,
    marginBottom: 16,
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.medium,
    color: Colors.white,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 48) / 2, // Account for padding and gap
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionIconText: {
    fontSize: 24,
  },
  quickActionTitle: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.medium,
    color: Colors.foreground,
    textAlign: 'center',
  },
});