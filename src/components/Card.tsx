import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Fonts } from '../constants';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  onPress,
  style,
  children,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        )}
        {children}
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.cardForeground,
    marginBottom: 8,
  },
  description: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    lineHeight: 20,
  },
});