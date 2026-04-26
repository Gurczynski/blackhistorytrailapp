import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../providers/ThemeProvider';

interface FAQBlockProps {
  data: Record<string, unknown>;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ data }) => {
  const { color, fontSize, spacing, radius } = useAppTheme();
  const questions = (data.questions as Array<{ q: string; a: string }>) || [];
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingHorizontal: spacing(2), paddingVertical: spacing(1) }]}>
      {questions.map((item, i) => (
        <View key={i} style={[styles.item, { borderRadius: radius(), backgroundColor: color('surface'), marginBottom: spacing() }]}>
          <TouchableOpacity
            onPress={() => setExpandedIndex(expandedIndex === i ? null : i)}
            style={styles.questionRow}
            activeOpacity={0.7}
          >
            <Text style={[styles.question, { color: color('text'), fontSize: fontSize(16) }]}>
              {item.q}
            </Text>
            <Text style={[styles.arrow, { color: color('primary'), fontSize: fontSize(18) }]}>
              {expandedIndex === i ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {expandedIndex === i ? (
            <Text style={[styles.answer, { color: color('textSecondary'), fontSize: fontSize(14) }]}>
              {item.a}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 16,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontWeight: '600',
    flex: 1,
  },
  arrow: {
    marginLeft: 8,
  },
  answer: {
    marginTop: 12,
    lineHeight: 22,
  },
});
