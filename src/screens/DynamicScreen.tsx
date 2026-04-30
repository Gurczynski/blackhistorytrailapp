import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import type { AppSchemaScreen } from '../types/app-schema';
import { blockRegistry } from '../components/blocks/registry';

interface DynamicScreenProps {
  screen: AppSchemaScreen;
}

export default function DynamicScreen({ screen }: DynamicScreenProps) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {screen.blocks.map((block) => {
        const BlockComponent = blockRegistry[block.type];
        if (!BlockComponent) {
          return (
            <View key={block.id} style={{ padding: 16 }}>
              <Text style={{ color: '#999' }}>Unknown block: {block.type}</Text>
            </View>
          );
        }
        return <BlockComponent key={block.id} block={block} />;
      })}
    </ScrollView>
  );
}