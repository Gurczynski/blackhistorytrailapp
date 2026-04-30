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
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { useAppTheme } from '../providers/ThemeProvider';
import testData from '../data/testData.json';

const { width } = Dimensions.get('window');

export const EventsScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(23);
  const [currentMonth] = useState('July 2024');
  const { Colors, Fonts } = useAppTheme();

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
            isSelected && styles.calendarDaySelected,
            hasEvent && styles.calendarDayHasEvent,
          ]}
        >
          <Text style={[styles.calendarDayText, isSelected && styles.calendarDayTextSelected]}>
            {day}
          </Text>
          {hasEvent && <View style={styles.eventDot} />}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const styles = useMemo(() => StyleSheet.create({
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
    calendarTitle: {
      fontSize: Fonts.sizes.lg,
      fontWeight: Fonts.weights.bold,
      color: Colors.foreground,
    },
    calendarSubtitle: {
      fontSize: Fonts.sizes.sm,
      color: Colors.mutedForeground,
    },
    calendarGrid: {
      paddingHorizontal: 16,
    },
    calendarDay: {
      width: (width - 80) / 7,
      height: (width - 80) / 7,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 8,
    },
    calendarDaySelected: {
      backgroundColor: Colors.primary,
    },
    calendarDayHasEvent: {
      position: 'relative',
    },
    calendarDayText: {
      fontSize: Fonts.sizes.sm,
      color: Colors.foreground,
    },
    calendarDayTextSelected: {
      color: Colors.primaryForeground,
      fontWeight: Fonts.weights.bold,
    },
    calendarDayTextMuted: {
      fontSize: Fonts.sizes.sm,
      color: Colors.mutedForeground,
    },
    eventDot: {
      position: 'absolute',
      bottom: 4,
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: Colors.accent,
    },
    listContainer: {
      padding: 16,
    },
    eventCard: {
      marginBottom: 16,
    },
    eventCardContent: {
      padding: 16,
    },
    eventTitle: {
      fontSize: Fonts.sizes.lg,
      fontWeight: Fonts.weights.semibold,
      color: Colors.foreground,
      marginBottom: 8,
    },
    eventDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    eventDetailText: {
      fontSize: Fonts.sizes.sm,
      color: Colors.mutedForeground,
      marginLeft: 8,
    },
  }), [Colors, Fonts, width]);

  return (
    <View style={styles.container}>
      <Header title="Events" showBackButton={false} />
      <View style={styles.viewToggleContainer}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'calendar' && styles.activeToggleButton]}
            onPress={() => setViewMode('calendar')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'calendar' && styles.activeToggleButtonText]}>
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.activeToggleButton]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'list' && styles.activeToggleButtonText]}>
              List
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'calendar' ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.calendarNavButton}>
              <Icon name="chevron-left" size={24} color={Colors.foreground} />
            </TouchableOpacity>
            <View>
              <Text style={styles.calendarTitle}>{currentMonth}</Text>
              <Text style={styles.calendarSubtitle}>2024</Text>
            </View>
            <TouchableOpacity style={styles.calendarNavButton}>
              <Icon name="chevron-right" size={24} color={Colors.foreground} />
            </TouchableOpacity>
          </View>
          <View style={styles.calendarGrid}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <Text key={day} style={{ width: (width - 80) / 7, textAlign: 'center', fontSize: Fonts.sizes.xs, color: Colors.mutedForeground }}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {generateCalendar()}
            </View>
          </View>

          {/* Event list for selected date */}
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: Fonts.sizes.lg, fontWeight: Fonts.weights.semibold, color: Colors.foreground, marginBottom: 12 }}>
              Events on July {selectedDate}
            </Text>
            {testData.events.filter(e => e.day === selectedDate).map((event, idx) => (
              <Card key={idx} style={styles.eventCard}>
                <View style={styles.eventCardContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventDetails}>
                    <Icon name="access-time" size={16} color={Colors.mutedForeground} />
                    <Text style={styles.eventDetailText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Icon name="location-on" size={16} color={Colors.mutedForeground} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.listContainer}>
            {testData.events.map((event, idx) => (
              <Card key={idx} style={styles.eventCard}>
                <View style={styles.eventCardContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventDetails}>
                    <Icon name="calendar-today" size={16} color={Colors.mutedForeground} />
                    <Text style={styles.eventDetailText}>July {event.day}, 2024</Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Icon name="access-time" size={16} color={Colors.mutedForeground} />
                    <Text style={styles.eventDetailText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Icon name="location-on" size={16} color={Colors.mutedForeground} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
