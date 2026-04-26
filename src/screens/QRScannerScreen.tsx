import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';

const { width, height } = Dimensions.get('window');

export const QRScannerScreen: React.FC = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(true);
  const { Colors, Fonts } = useAppTheme();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onSuccess = (e: { data: string }) => {
    setScanning(false);
    Alert.alert(
      'QR Code Detected!',
      `Welcome to Riverfront Park! You've discovered the Historic Bridge viewpoint. Learn about the bridge's role in connecting Daytona Beach communities since 1928.`,
      [
        {
          text: 'Learn More',
          onPress: () => {
            // Navigate to park details or information
            navigation.goBack();
          },
        },
        {
          text: 'Scan Another',
          onPress: () => setScanning(true),
        },
      ]
    );
  };

  const simulateScan = () => {
    onSuccess({ data: 'simulated-qr-code' });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Scan QR Code"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      {hasPermission === null && (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      )}
      {hasPermission === false && (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Camera access denied. Please enable it in settings.</Text>
        </View>
      )}

      {hasPermission && scanning ? (
        <View style={styles.cameraWrapper}>
          <BarCodeScanner
            onBarCodeScanned={({ data }) => onSuccess({ data })}
            style={styles.camera}
          />
          <View style={styles.scannerOverlay}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </View>
      ) : hasPermission ? (
        <View style={styles.resultContainer}>
          <View style={styles.successIcon}>
            <Icon name="check-circle" size={64} color={Colors.success} />
          </View>
          <Text style={styles.successTitle}>QR Code Detected!</Text>
          <Text style={styles.successMessage}>
            Welcome to Riverfront Park! You've discovered the Historic Bridge viewpoint.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setScanning(true)}
          >
            <Icon name="refresh" size={20} color={Colors.primary} />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Scan Another
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {hasPermission && scanning && (
        <View style={styles.bottomControls}>
          <View style={styles.instructionsContainer}>
            <Icon name="qr-code-scanner" size={32} color="white" />
            <Text style={styles.instructionsTitle}>Point your camera at a QR code</Text>
            <Text style={styles.instructionsSubtitle}>
              Look for QR codes on park signs and information boards
            </Text>
          </View>
          
          <TouchableOpacity style={styles.simulateButton} onPress={simulateScan}>
            <Icon name="qr-code-scanner" size={20} color="white" />
            <Text style={styles.simulateButtonText}>Simulate Scan</Text>
          </TouchableOpacity>
          
          <Text style={styles.bottomText}>
            Find QR codes throughout the park to unlock exclusive content
          </Text>
        </View>
      )}
    </View>
  );
};

  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraWrapper: {
    height: height - 200,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  marker: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  scannerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scannerFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.primary,
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 24,
  },
  permissionText: {
    fontSize: Fonts.sizes.base,
    color: Colors.foreground,
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 24,
    alignItems: 'center',
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: Fonts.sizes.base,
    color: 'white',
    fontWeight: Fonts.weights.medium,
    marginTop: 8,
    marginBottom: 4,
  },
  instructionsSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  simulateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  simulateButtonText: {
    fontSize: Fonts.sizes.base,
    color: 'white',
    fontWeight: Fonts.weights.medium,
    marginLeft: 8,
  },
  bottomText: {
    fontSize: Fonts.sizes.xs,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 24,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.medium,
    color: 'white',
  },
  secondaryButtonText: {
    color: Colors.primary,
    marginLeft: 8,
  },
  }),
  [Colors, Fonts]);