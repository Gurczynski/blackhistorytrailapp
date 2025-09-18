import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ScavengerHuntScreen: React.FC = () => {
  const navigation = useNavigation();

  const startHunt = () => {
    // Placeholder for VR hunt functionality
    console.log('Starting VR Scavenger Hunt...');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Scavenger Hunt"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Icon name="explore" size={80} color={Colors.accent} />
          <Text style={styles.title}>Park Adventure Hunt</Text>
          <Text style={styles.description}>
            Explore Daytona Beach parks through an immersive VR scavenger hunt experience. 
            Find hidden treasures and learn about local history!
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Icon name="visibility" size={32} color={Colors.primary} />
            <Text style={styles.featureText}>VR Experience</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="location-on" size={32} color={Colors.primary} />
            <Text style={styles.featureText}>GPS Navigation</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="star" size={32} color={Colors.primary} />
            <Text style={styles.featureText}>Earn Rewards</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={startHunt}>
          <Icon name="play-arrow" size={24} color={Colors.white} />
          <Text style={styles.startButtonText}>Start Hunt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: Fonts.sizes['3xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.foreground,
    marginTop: 8,
    fontWeight: Fonts.weights.medium,
  },
  startButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.white,
    marginLeft: 8,
  },
});