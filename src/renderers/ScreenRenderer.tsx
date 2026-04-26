import React from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { blockRenderers } from '../blocks';
import { useAppTheme } from '../providers/ThemeProvider';
import type { ContentBlockRow } from '../hooks/useAppConfig';

interface ScreenRendererProps {
  blocks: ContentBlockRow[];
  loading?: boolean;
}

export const ScreenRenderer: React.FC<ScreenRendererProps> = ({ blocks, loading }) => {
  const { color } = useAppTheme();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={color('primary')} />
      </View>
    );
  }

  if (blocks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: color('textSecondary'), fontSize: 16 }}>No content yet</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: color('background') }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {blocks.map((block) => {
        const Renderer = blockRenderers[block.type];
        if (!Renderer) {
          return (
            <View key={block.id} style={{ padding: 16 }}>
              <Text style={{ color: color('textSecondary') }}>
                Unknown block type: {block.type}
              </Text>
            </View>
          );
        }
        return <Renderer key={block.id} data={block.data} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 12,
  },
});
