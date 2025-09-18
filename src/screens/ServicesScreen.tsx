import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const testData = require('../data/testData.json');

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'billing', label: 'Billing' },
    { id: 'permits', label: 'Permits' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'recreation', label: 'Recreation' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? testData.services 
    : testData.services.filter((service: any) => service.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Header 
        title="City Services" 
        showSearch
        onSearchPress={() => navigation.navigate('SearchResults', { query: 'services' })}
      />
      
      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.activeTab,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryTabText,
              selectedCategory === category.id && styles.activeTabText,
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
          >
            <View style={styles.serviceIcon}>
              <Icon name={item.icon} size={24} color={Colors.primary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
              {item.availability && (
                <Text style={styles.serviceAvailability}>🕒 {item.availability}</Text>
              )}
            </View>
            <Icon name="chevron-right" size={24} color={Colors.mutedForeground} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.servicesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoryTabs: {
    maxHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.cardBackground,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    fontWeight: Fonts.weights.medium,
  },
  activeTabText: {
    color: Colors.white,
  },
  servicesList: {
    padding: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 4,
  },
  serviceAvailability: {
    fontSize: Fonts.sizes.xs,
    color: Colors.success,
  },
});