import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAppTheme } from '../providers/ThemeProvider';

interface MapBlockProps {
  data: Record<string, unknown>;
}

export const MapBlock: React.FC<MapBlockProps> = ({ data }) => {
  const { color, fontSize, spacing, radius } = useAppTheme();
  const lat = (data.latitude as number) || (data.lat as number) || 0;
  const lng = (data.longitude as number) || (data.lng as number) || 0;
  const title = (data.title as string) || '';

  return (
    <View style={[styles.container, { paddingHorizontal: spacing(2), paddingVertical: spacing(1) }]}>
      {title ? (
        <Text style={[styles.title, { color: color('text'), fontSize: fontSize(18) }]}>
          {title}
        </Text>
      ) : null}
      <View style={[styles.mapWrapper, { borderRadius: radius() }]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: lng }} title={title} />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: '700',
    marginBottom: 12,
  },
  mapWrapper: {
    height: 250,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
