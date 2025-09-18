import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

export const EventsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState('2024-07-23');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const handleSearch = () => {
    navigation.navigate('SearchResults', { query: 'events' });
  };

  const renderCalendarDay = (day: number, hasEvent: boolean = false) => {
    const isSelected = selectedDate === `2024-07-${day.toString().padStart(2, '0')}`;
    
    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.calendarDay,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => setSelectedDate(`2024-07-${day.toString().padStart(2, '0')}`)}
      >
        <Text style={[
          styles.calendarDayText,
          isSelected && styles.selectedDayText,
        ]}>
          {day}
        </Text>
        {hasEvent && !isSelected && <View style={styles.eventDot} />}
      </TouchableOpacity>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = 31;
    const eventsOnDays = [15, 20, 23, 25, 27]; // Sample event days
    const calendar = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(renderCalendarDay(i, eventsOnDays.includes(i)));
    }
    
    return (
      <View style={styles.calendar}>
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <Text style={styles.monthTitle}>July 2024</Text>
        </View>
        
        {/* Days of week */}
        <View style={styles.weekHeader}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        
        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {calendar}
        </View>
      </View>
    );
  };

  const filteredEvents = testData.events.filter((event: any) => 
    event.date === selectedDate
  );

  return (
    <View style={styles.container}>
      <Header
        title="Events"
        showSearch
        onSearchPress={handleSearch}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'calendar' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('calendar')}
          >
            <Text style={[
              styles.toggleButtonText,
              viewMode === 'calendar' && styles.toggleButtonTextActive,
            ]}>
              Calendar View
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[
              styles.toggleButtonText,
              viewMode === 'list' && styles.toggleButtonTextActive,
            ]}>
              List View
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar or List View */}
        {viewMode === 'calendar' ? (
          <>
            {renderCalendar()}
            
            {/* Events for Selected Date */}
            <View style={styles.selectedDateEvents}>
              <Text style={styles.selectedDateTitle}>
                Events for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event: any) => (
                  <View key={event.id} style={styles.eventCard}>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventTime}>{event.time}</Text>
                      <Text style={styles.eventLocation}>{event.location}</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noEventsText}>No events scheduled</Text>
              )}
            </View>
          </>
        ) : (
          <View style={styles.listView}>
            {testData.events.map((event: any) => (
              <Card
                key={event.id}
                title={event.title}
                description={`${event.date} • ${event.time} • ${event.location}`}
                image={event.image}
                onPress={() => {
                  console.log('Navigate to event:', event.id);
                }}
              />
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  viewToggle: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.mutedForeground,
  },
  toggleButtonTextActive: {
    color: Colors.white,
  },
  calendar: {
    margin: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.mutedForeground,
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 20,
    position: 'relative',
  },
  selectedDay: {
    backgroundColor: Colors.primary,
  },
  calendarDayText: {
    fontSize: Fonts.sizes.base,
    color: Colors.foreground,
  },
  selectedDayText: {
    color: Colors.white,
    fontWeight: Fonts.weights.bold,
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  selectedDateEvents: {
    margin: 16,
  },
  selectedDateTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  detailsButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.white,
  },
  noEventsText: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  listView: {
    padding: 16,
  },
});