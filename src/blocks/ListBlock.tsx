import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../providers/ThemeProvider';

interface ListBlockProps {
  data: Record<string, unknown>;
}

export const ListBlock: React.FC<ListBlockProps> = ({ data }) => {
  const { color, fontSize, spacing } = useAppTheme();
  const items = (data.items as string[]) || [];
  const style = (data.style as string) || 'bullet';

  return (
    <View style={[styles.container, { paddingHorizontal: spacing(2), paddingVertical: spacing(1) }]}>
      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          <Text style={[styles.bullet, { color: color('primary'), fontSize: fontSize(16) }]}>
            {style === 'numbered' ? `${i + 1}.` : '•'}
          </Text>
          <Text style={[styles.itemText, { color: color('text'), fontSize: fontSize(16) }]}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    width: 24,
    fontWeight: '700',
  },
  itemText: {
    flex: 1,
    lineHeight: 24,
  },
});
