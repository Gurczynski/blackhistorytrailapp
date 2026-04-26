import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAppTheme } from '../providers/ThemeProvider';

interface ImageBlockProps {
  data: Record<string, unknown>;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ data }) => {
  const { color, fontSize, spacing, radius } = useAppTheme();
  const url = (data.url as string) || '';
  const alt = (data.alt as string) || '';
  const caption = (data.caption as string) || '';

  if (!url) return null;

  return (
    <View style={[styles.container, { paddingHorizontal: spacing(2), paddingVertical: spacing(1) }]}>
      <Image
        source={{ uri: url }}
        style={[styles.image, { borderRadius: radius() }]}
        accessibilityLabel={alt}
        resizeMode="cover"
      />
      {caption ? (
        <Text style={[styles.caption, { color: color('textSecondary'), fontSize: fontSize(12) }]}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 200,
  },
  caption: {
    marginTop: 8,
    textAlign: 'center',
  },
});
