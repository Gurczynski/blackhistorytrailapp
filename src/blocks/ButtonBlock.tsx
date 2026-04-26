import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../providers/ThemeProvider';

interface ButtonBlockProps {
  data: Record<string, unknown>;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ data }) => {
  const { color, fontSize, spacing, radius } = useAppTheme();
  const navigation = useNavigation<any>();
  const label = (data.label as string) || 'Button';
  const action = (data.action as string) || 'none';
  const url = (data.url as string) || '';
  const screen = (data.screen as string) || '';

  const handlePress = () => {
    switch (action) {
      case 'link':
        if (url) Linking.openURL(url);
        break;
      case 'screen':
        if (screen) navigation.navigate(screen);
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        {
          backgroundColor: color('primary'),
          borderRadius: radius(),
          marginHorizontal: spacing(2),
          marginVertical: spacing(),
          paddingVertical: spacing(1.5),
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, { color: '#FFFFFF', fontSize: fontSize(16) }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
});
