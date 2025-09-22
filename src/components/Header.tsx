import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Colors, Fonts } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSearch = true,
  onBackPress,
  onSearchPress,
  rightComponent,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.headerBackground} />
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
              <Icon name="arrow-back" size={24} color={Colors.headerForeground} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity
              onPress={onSearchPress ?? (() => navigation.navigate('Search' as never))}
              style={styles.iconButton}
            >
              <Icon name="search" size={24} color={Colors.headerForeground} />
            </TouchableOpacity>
          )}
          {rightComponent}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: Colors.headerBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.headerForeground,
  },
  iconButton: {
    padding: 8,
  },
});