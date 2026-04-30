import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../providers/ThemeProvider';

interface ButtonBlockProps {
  label?: string;
  onPress?: () => void;
  style?: object;
}

export default function ButtonBlock({ label = 'Button', style }: ButtonBlockProps) {
  const { Colors } = useAppTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors.accent }, style]}
    >
      <Text style={[styles.text, { color: Colors.background }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});