import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';
import { RootStackParamList } from '../types';
import testData from '../data/testData.json';

export const ServiceDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const { Colors, Fonts } = useAppTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceDetail'>>();
  const { serviceId } = route.params;
  const service = testData.services.find(s => s.id === serviceId);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { padding: 16 },
    title: {
      fontSize: Fonts.sizes.xl,
      fontWeight: Fonts.weights.bold,
      color: Colors.foreground,
      marginBottom: 8,
    },
    description: { color: Colors.mutedForeground, fontSize: Fonts.sizes.base, marginBottom: 16 },
    section: { marginTop: 16 },
    sectionTitle: {
      fontSize: Fonts.sizes.lg,
      fontWeight: Fonts.weights.semibold,
      color: Colors.foreground,
      marginBottom: 8,
    },
    subsection: { marginTop: 8 },
    subTitle: { fontWeight: Fonts.weights.semibold, color: Colors.cardForeground, marginBottom: 4 },
    listItem: { color: Colors.cardForeground, marginBottom: 4 },
    body: { color: Colors.cardForeground, lineHeight: 20 },
  }), [Colors, Fonts]);

  return (
    <View style={styles.container}>
      <Header title={service ? service.title : 'Service'} showBack onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {service ? (
          <>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.description}>{service.description}</Text>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Details</Text>
              <Text style={styles.body}>{service.details.overview}</Text>
              {service.details.howTo && (
                <View style={styles.subsection}>
                  <Text style={styles.subTitle}>How To</Text>
                  {service.details.howTo.map((item, idx) => (
                    <Text key={idx} style={styles.listItem}>• {item}</Text>
                  ))}
                </View>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.description}>Service not found.</Text>
        )}
      </ScrollView>
    </View>
  );
};
