import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '../constants';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  showSearch?: boolean;
  onSearchPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  rightComponent,
  showSearch = false,
  onSearchPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.headerBackground}
      />
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon 
                name="arrow-back" 
                size={24} 
                color={Colors.headerForeground} 
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity
              onPress={onSearchPress}
              style={styles.searchButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon 
                name="search" 
                size={24} 
                color={Colors.headerForeground} 
              />
            </TouchableOpacity>
          )}
          {rightComponent}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.headerBackground,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: Colors.headerBackground,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.headerForeground,
    textAlign: 'center',
  },
  backButton: {
    padding: 4,
  },
  searchButton: {
    padding: 4,
  },
});