import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Colors, Fonts } from '../constants';
import testData from '../data/testData.json';

const { width } = Dimensions.get('window');

export const EventsScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(23);
  const [currentMonth] = useState('July 2024');
  
  const eventDays = [4, 15, 19, 23, 25];
  
  const generateCalendar = () => {
    const daysInMonth = 31;
    const firstDay = 1; // Monday
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay}>
          <Text style={styles.calendarDayTextMuted}>{30 + i}</Text>
        </View>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const hasEvent = eventDays.includes(day);
      
      days.push(
        <TouchableOpacity
          key={day}
          onPress={() => setSelectedDate(day)}
          style={[
            styles.calendarDay,
            isSelected && styles.selectedDay,
            hasEvent && styles.eventDay,
          ]}
        >
          <Text style={[
            styles.calendarDayText,
            isSelected && styles.selectedDayText,
          ]}>
            {day}
          </Text>
          {hasEvent && <View style={styles.eventIndicator} />}
        </TouchableOpacity>
      );
    }
    
    return days;
  };
  
  return (
    <View style={styles.container}>
      <Header title="Events" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* View Toggle */}
        <View style={styles.viewToggleContainer}>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              onPress={() => setViewMode('calendar')}
              style={[
                styles.toggleButton,
                viewMode === 'calendar' && styles.activeToggleButton,
              ]}
            >
              <Text style={[
                styles.toggleButtonText,
                viewMode === 'calendar' && styles.activeToggleButtonText,
              ]}>
                Calendar View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('list')}
              style={[
                styles.toggleButton,
                viewMode === 'list' && styles.activeToggleButton,
              ]}
            >
              <Text style={[
                styles.toggleButtonText,
                viewMode === 'list' && styles.activeToggleButtonText,
              ]}>
                List View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.calendarNavButton}>
            <Icon name="chevron-left" size={24} color={Colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.calendarHeaderText}>{currentMonth}</Text>
          <TouchableOpacity style={styles.calendarNavButton}>
            <Icon name="chevron-right" size={24} color={Colors.foreground} />
          </TouchableOpacity>
        </View>
        
        {/* Calendar Grid */}
        <View style={styles.calendarContainer}>
          <View style={styles.weekDaysHeader}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {generateCalendar()}
          </View>
        </View>
        
        {/* Selected Date Events */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>July {selectedDate}, 2024</Text>
          
          {testData.events.map(event => (
            <Card
              key={event.id}
              title={event.title}
              image={event.image}
              onPress={() => {}}
            >
              <View style={styles.eventDetails}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
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
  viewToggleContainer: {
    padding: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.muted,
    borderRadius: 25,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 21,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: Colors.primary,
  },
  toggleButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.mutedForeground,
  },
  activeToggleButtonText: {
    color: Colors.primaryForeground,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  calendarNavButton: {
    padding: 8,
  },
  calendarHeaderText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  calendarContainer: {
    paddingHorizontal: 16,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.mutedForeground,
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  calendarDay: {
    width: width / 7 - 2,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: Colors.primary,
  },
  eventDay: {
    position: 'relative',
  },
  calendarDayText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.foreground,
  },
  calendarDayTextMuted: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  selectedDayText: {
    color: Colors.primaryForeground,
    fontWeight: Fonts.weights.bold,
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
  eventsSection: {
    padding: 16,
  },
  eventsSectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 16,
  },
  eventDetails: {
    marginTop: 8,
  },
  eventTime: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.cardForeground,
    lineHeight: 20,
  },
});