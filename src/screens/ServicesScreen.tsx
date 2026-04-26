import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';
import { RootStackParamList } from '../types';
import testData from '../data/testData.json';

const { width } = Dimensions.get('window');

type ServicesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<ServicesScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState('all');
  const { Colors, Fonts } = useAppTheme();
  
  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'residents', label: 'Residents' },
    { id: 'business', label: 'Business' },
    { id: 'online', label: 'Online' },
  ];

  const quickActions = [
    {
      icon: 'credit-card',
      title: 'Pay Utility Bill',
      color: Colors.info,
      serviceId: 1,
    },
    {
      icon: 'description',
      title: 'Permits',
      color: Colors.warning,
      serviceId: null,
    },
    {
      icon: 'report-problem',
      title: 'Report Issue',
      color: Colors.error,
      serviceId: null,
    },
    {
      icon: 'park',
      title: 'Parks & Rec',
      color: Colors.success,
      serviceId: null,
    },
  ];
  
  const filteredServices = activeTab === 'all' 
    ? testData.services 
    : testData.services.filter(service => service.category === activeTab);

  const getIconName = (iconString: string) => {
    switch (iconString) {
      case 'credit-card':
        return 'credit-card';
      case 'recycle':
        return 'recycling';
      default:
        return 'help';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="City Services" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Service Categories */}
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContent}
          >
            {tabs.map(tab => (
              <TouchableOpacity 
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab,
                ]}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => {
                  if (action.serviceId) {
                    navigation.navigate('ServiceDetail', { serviceId: action.serviceId });
                  }
                }}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <Icon name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Services List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>For Our Residents</Text>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionEmoji}>🏠</Text>
            </View>
          </View>
          
          <View style={styles.servicesList}>
            {filteredServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
              >
                <View style={styles.serviceIconContainer}>
                  <Icon 
                    name={getIconName(service.icon)} 
                    size={24} 
                    color={Colors.primary} 
                  />
                </View>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceAvailability}>
                    <Icon name="schedule" size={12} color={Colors.mutedForeground} />
                    <Text style={styles.serviceAvailabilityText}>
                      {service.availability}
                    </Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={24} color={Colors.mutedForeground} />
              </TouchableOpacity>
            ))}
          </View>
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
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.mutedForeground,
  },
  activeTabText: {
    color: Colors.primary,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionEmoji: {
    fontSize: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.cardForeground,
    textAlign: 'center',
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary + '20',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.semibold,
    color: Colors.cardForeground,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 8,
    lineHeight: 18,
  },
  serviceAvailability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceAvailabilityText: {
    fontSize: Fonts.sizes.xs,
    color: Colors.mutedForeground,
    marginLeft: 4,
  },
  }),
  [Colors, Fonts]);