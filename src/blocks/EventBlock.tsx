import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAppTheme } from '../providers/ThemeProvider';

interface EventBlockProps {
  data: Record<string, unknown>;
}

export const EventBlock: React.FC<EventBlockProps> = ({ data }) => {
  const { color, fontSize, spacing, radius } = useAppTheme();
  const title = (data.title as string) || '';
  const date = (data.date as string) || '';
  const time = (data.time as string) || '';
  const location = (data.location as string) || '';
  const image = (data.image as string) || '';
  const description = (data.description as string) || '';

  return (
    <View style={[styles.container, { marginHorizontal: spacing(2), marginVertical: spacing() }]}>
      <View style={[styles.card, { backgroundColor: color('surface'), borderRadius: radius(), borderColor: color('primary'), borderWidth: 1 }]}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.image, { borderTopLeftRadius: radius(), borderTopRightRadius: radius() }]}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.content}>
          {title ? (
            <Text style={[styles.title, { color: color('text'), fontSize: fontSize(18) }]}>
              {title}
            </Text>
          ) : null}
          {date || time ? (
            <Text style={[styles.datetime, { color: color('accent'), fontSize: fontSize(14) }]}>
              {date}{date && time ? ' • ' : ''}{time}
            </Text>
          ) : null}
          {location ? (
            <Text style={[styles.location, { color: color('textSecondary'), fontSize: fontSize(14) }]}>
              📍 {location}
            </Text>
          ) : null}
          {description ? (
            <Text style={[styles.description, { color: color('text'), fontSize: fontSize(14) }]}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
  },
  datetime: {
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    marginBottom: 12,
  },
  description: {
    lineHeight: 22,
  },
});
