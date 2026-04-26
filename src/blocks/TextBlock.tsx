import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../providers/ThemeProvider';

interface TextBlockProps {
  data: Record<string, unknown>;
}

export const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
  const { color, fontSize, spacing } = useAppTheme();
  const content = (data.content as string) || '';

  return (
    <View style={[styles.container, { paddingHorizontal: spacing(2), paddingVertical: spacing(2) }]}>
      <Text style={[styles.text, { color: color('text'), fontSize: fontSize(16) }]}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    lineHeight: 24,
  },
});
