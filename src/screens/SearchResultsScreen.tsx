import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Colors, Fonts } from '../constants';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const testData = require('../data/testData.json');

type SearchResultsRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

export const SearchResultsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SearchResultsRouteProp>();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const allData = [
      ...testData.cityHighlights.map((item: any) => ({ ...item, type: 'highlight' })),
      ...testData.events.map((item: any) => ({ ...item, type: 'event' })),
      ...testData.services.map((item: any) => ({ ...item, type: 'service' })),
    ];

    const filtered = allData.filter((item: any) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(query.toLowerCase()))
    );

    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Search"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color={Colors.mutedForeground} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city services, events, and more..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {searchQuery.trim() === '' ? (
          <View style={styles.emptyState}>
            <Icon name="search" size={48} color={Colors.mutedForeground} />
            <Text style={styles.emptyStateTitle}>Search Daytona Beach</Text>
            <Text style={styles.emptyStateText}>
              Find city services, events, parks, and more
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="search-off" size={48} color={Colors.mutedForeground} />
            <Text style={styles.emptyStateTitle}>No results found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search terms
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.resultsCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </Text>
            {results.map((item, index) => (
              <Card
                key={`${item.type}-${item.id}-${index}`}
                title={item.title}
                description={item.description || item.excerpt}
                image={item.image}
                onPress={() => {
                  if (item.type === 'service') {
                    navigation.navigate('ServiceDetail', { serviceId: item.id });
                  }
                }}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: Fonts.sizes.base,
    color: Colors.foreground,
    marginLeft: 12,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsCount: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
});