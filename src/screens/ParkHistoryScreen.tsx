import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';
import { RootStackParamList } from '../types';
import testData from '../data/testData.json';

export const ParkHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ParkHistory'>>();
  const { parkId } = route.params;
  const park = testData.parks.find(p => p.id === parkId);
  const { Colors, Fonts } = useAppTheme();

  // Mock historical data for demonstration
  const historicalInfo = {
    established: '1928',
    significance: 'Historic waterfront park that has served as a community gathering place for nearly a century.',
    keyEvents: [
      'Originally developed as part of the city\'s waterfront beautification project',
      'Served as a gathering place during World War II for community events',
      'Underwent major renovation in 1985 to add modern amenities',
      'Designated as a historic landmark in 2010'
    ],
    funFacts: [
      'The park\'s gazebo was built using materials from a demolished 1920s hotel',
      'Over 50 species of birds have been documented in the park',
      'The walking trail follows the original shoreline from the 1800s'
    ]
  };

  return (
    <View style={styles.container}>
      <Header 
        title={park ? `${park.name} History` : 'Park History'} 
        showBack 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {park ? (
          <>
            {/* Hero Image */}
            <Image source={{ uri: park.images[0] }} style={styles.heroImage} />
            
            {/* Park Info */}
            <View style={styles.content}>
              <Text style={styles.parkName}>{park.name}</Text>
              <Text style={styles.established}>Established {historicalInfo.established}</Text>
              
              {/* Historical Significance */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historical Significance</Text>
                <Text style={styles.sectionText}>{historicalInfo.significance}</Text>
              </View>
              
              {/* Key Events */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Historical Events</Text>
                {historicalInfo.keyEvents.map((event, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.listText}>{event}</Text>
                  </View>
                ))}
              </View>
              
              {/* Fun Facts */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Did You Know?</Text>
                {historicalInfo.funFacts.map((fact, index) => (
                  <View key={index} style={styles.factCard}>
                    <Text style={styles.factText}>{fact}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Park not found.</Text>
          </View>
        )}
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
  heroImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  parkName: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 8,
  },
  established: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: Fonts.sizes.base,
    color: Colors.cardForeground,
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 9,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: Fonts.sizes.base,
    color: Colors.cardForeground,
    lineHeight: 24,
  },
  factCard: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  factText: {
    fontSize: Fonts.sizes.base,
    color: Colors.cardForeground,
    lineHeight: 22,
  },
  }),
  [Colors, Fonts]);