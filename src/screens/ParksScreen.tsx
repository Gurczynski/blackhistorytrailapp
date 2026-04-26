import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';
import { RootStackParamList } from '../types';
import testData from '../data/testData.json';

const { width } = Dimensions.get('window');

type ParksScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const ParksScreen: React.FC = () => {
  const navigation = useNavigation<ParksScreenNavigationProp>();
  const { Colors, Fonts } = useAppTheme();

  const parkFeatures = [
    {
      icon: 'photo-library',
      title: 'Gallery',
      description: 'View park photos',
      onPress: () => navigation.navigate('ParkGallery', { parkId: 1 }),
    },
    {
      icon: 'history',
      title: 'History',
      description: 'Learn park history',
      onPress: () => navigation.navigate('ParkHistory', { parkId: 1 }),
    },
    {
      icon: 'qr-code-scanner',
      title: 'QR Scanner',
      description: 'Scan park codes',
      onPress: () => navigation.navigate('QRScanner'),
    },
    {
      icon: 'explore',
      title: 'Scavenger Hunt',
      description: 'Interactive challenges',
      onPress: () => navigation.navigate('ScavengerHunt'),
    },
    {
      icon: 'map',
      title: 'Parks Map',
      description: 'Find all parks',
      onPress: () => navigation.navigate('ParksMap'),
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Parks & Recreation" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* AR Experience Banner */}
        <TouchableOpacity style={styles.arBanner}>
          <Image
            source={{ uri: testData.parks[0].images[0] }}
            style={styles.arBannerImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.arBannerGradient}
          />
          
          <View style={styles.arBannerContent}>
            <Text style={styles.arBannerTitle}>
              Riverfront Park Interactive Experience
            </Text>
            <Text style={styles.arBannerSubtitle}>
              Discover hidden stories and start your adventure
            </Text>
            <View style={styles.arBannerButton}>
              <Icon name="camera-alt" size={20} color="white" />
              <Text style={styles.arBannerButtonText}>Start AR Experience</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Park Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Explore Parks</Text>
          <View style={styles.featuresGrid}>
            {parkFeatures.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={feature.onPress}
              >
                <View style={styles.featureIconContainer}>
                  <Icon name={feature.icon} size={32} color={Colors.primary} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Parks */}
        <View style={styles.parksSection}>
          <Text style={styles.sectionTitle}>Featured Parks</Text>
          {testData.parks.map((park) => (
            <TouchableOpacity key={park.id} style={styles.parkCard}>
              <Image source={{ uri: park.images[0] }} style={styles.parkImage} />
              <View style={styles.parkContent}>
                <Text style={styles.parkName}>{park.name}</Text>
                <Text style={styles.parkDescription}>{park.description}</Text>
                <View style={styles.parkDetails}>
                  <Icon name="location-on" size={16} color={Colors.mutedForeground} />
                  <Text style={styles.parkAddress}>{park.address}</Text>
                </View>
                <View style={styles.amenitiesContainer}>
                  {park.amenities.slice(0, 3).map((amenity, index) => (
                    <View key={index} style={styles.amenityBadge}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  arBanner: {
    height: 200,
    position: 'relative',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  arBannerImage: {
    width: '100%',
    height: '100%',
  },
  arBannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  arBannerContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  arBannerTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: 'white',
    marginBottom: 8,
  },
  arBannerSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  arBannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  arBannerButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: 'white',
    marginLeft: 8,
  },
  featuresSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 48) / 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: Colors.primary + '20',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.semibold,
    color: Colors.cardForeground,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
  parksSection: {
    padding: 16,
  },
  parkCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  parkImage: {
    width: '100%',
    height: 150,
  },
  parkContent: {
    padding: 16,
  },
  parkName: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.cardForeground,
    marginBottom: 8,
  },
  parkDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 8,
    lineHeight: 20,
  },
  parkDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  parkAddress: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginLeft: 4,
    flex: 1,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  amenityText: {
    fontSize: Fonts.sizes.xs,
    color: Colors.primary,
    fontWeight: Fonts.weights.medium,
  },
  }),
  [Colors, Fonts]);