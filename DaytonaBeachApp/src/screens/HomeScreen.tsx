import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Colors, Fonts } from '../constants';
import { RootStackParamList } from '../types';
import testData from '../data/testData.json';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleSearchPress = () => {
    navigation.navigate('Search', {});
  };

  return (
    <View style={styles.container}>
      <Header showSearch onSearchPress={handleSearchPress} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <TouchableOpacity
          style={styles.heroBanner}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Events' })}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          />
          
          {/* Logo overlay */}
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>DAYTONA BEACH</Text>
            </View>
          </View>
          
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Summer Music Festival</Text>
            <Text style={styles.heroSubtitle}>July 15, 2024 • 7:00 PM</Text>
            <View style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Learn More</Text>
            </View>
          </View>
          
          {/* Page indicators */}
          <View style={styles.pageIndicators}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>
        </TouchableOpacity>
        
        {/* City Highlights Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>City Highlights</Text>
          
          {testData.cityHighlights.map((highlight) => (
            <Card
              key={highlight.id}
              title={highlight.title}
              description={highlight.description}
              image={highlight.image}
              onPress={() => {}}
            >
              <View style={styles.highlightFooter}>
                <Text style={styles.highlightDate}>
                  {new Date(highlight.date).toLocaleDateString()}
                </Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{highlight.category}</Text>
                </View>
              </View>
            </Card>
          ))}
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
  heroBanner: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  logoContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  logoPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.bold,
    color: Colors.secondaryBlue,
  },
  heroContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.extrabold,
    color: 'white',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  heroButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.secondaryForeground,
  },
  pageIndicators: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeIndicator: {
    backgroundColor: 'white',
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
  highlightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  highlightDate: {
    fontSize: Fonts.sizes.xs,
    color: Colors.mutedForeground,
  },
  categoryBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: Fonts.sizes.xs,
    color: Colors.primary,
    fontWeight: Fonts.weights.medium,
  },
});