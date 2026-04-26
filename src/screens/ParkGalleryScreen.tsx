import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';
import { RootStackParamList } from '../types';
import ImageViewing from 'react-native-image-viewing';
import testData from '../data/testData.json';

const { width } = Dimensions.get('window');
const GAP = 8;
const COLS = 3;
const ITEM = (width - (GAP * (COLS + 1))) / COLS;

export const ParkGalleryScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ParkGallery'>>();
  const { parkId } = route.params;
  const park = testData.parks.find(p => p.id === parkId);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const { Colors, Fonts } = useAppTheme();

  const images = (park?.images || []).map((uri: string) => ({ uri }));

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    grid: { padding: GAP },
    cell: { width: ITEM, height: ITEM, margin: GAP },
    thumb: { width: '100%', height: '100%', borderRadius: 8 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { color: Colors.mutedForeground, fontSize: Fonts.sizes.base },
  }), [Colors, Fonts]);

  return (
    <View style={styles.container}>
      <Header title={park ? `${park.name} Gallery` : 'Gallery'} showBack onBackPress={() => navigation.goBack()} />

      {park ? (
        <FlatList<string>
          contentContainerStyle={styles.grid}
          data={park.images}
          keyExtractor={(uri, i) => `${uri}-${i}`}
          numColumns={COLS}
          renderItem={({ item, index: i }: { item: string; index: number }) => (
            <TouchableOpacity
              style={styles.cell}
              onPress={() => { setIndex(i); setVisible(true); }}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item }} style={styles.thumb} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.empty}><Text style={styles.emptyText}>Park not found.</Text></View>
      )}

      <ImageViewing
        images={images}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled
      />
    </View>
  );
};
