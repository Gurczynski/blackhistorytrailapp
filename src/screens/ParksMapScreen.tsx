import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';
import MapView, { Marker } from 'react-native-maps';
import testData from '../data/testData.json';
import { fetchParksFromGis, GisPark } from '../services/gis';

const { width, height } = Dimensions.get('window');

export const ParksMapScreen: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [gisParks, setGisParks] = React.useState<GisPark[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const { Colors, Fonts } = useAppTheme();

  const localParks = testData.parks;

  React.useEffect(() => {
    const ac = new AbortController();
    fetchParksFromGis(ac.signal)
      .then((res) => { setGisParks(res); })
      .catch((e) => { setError(e.message); })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, []);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    map: { width: '100%', height: height - 56 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { color: Colors.mutedForeground, fontSize: Fonts.sizes.base },
  }), [Colors, Fonts]);

  const hasGis = gisParks.length > 0;
  const initialRegion = hasGis
    ? { latitude: gisParks[0].latitude, longitude: gisParks[0].longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }
    : localParks.length
    ? { latitude: localParks[0].coordinates.latitude, longitude: localParks[0].coordinates.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }
    : undefined;

  return (
    <View style={styles.container}>
      <Header title="Parks Map" showBack />
      {loading && <View style={styles.center}><ActivityIndicator color={Colors.primary} /></View>}
      {!loading && initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {hasGis
            ? gisParks.map((p) => (
                <Marker key={`gis-${p.id}`} coordinate={{ latitude: p.latitude, longitude: p.longitude }} title={p.name} description={p.address} />
              ))
            : localParks.map((park) => (
                <Marker key={park.id} coordinate={{ latitude: park.coordinates.latitude, longitude: park.coordinates.longitude }} title={park.name} description={park.address} />
              ))}
        </MapView>
      )}
      {!loading && !initialRegion && (
        <View style={styles.empty}><Text style={styles.emptyText}>No parks available to display on the map.</Text></View>
      )}
    </View>
  );
};
