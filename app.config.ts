import type { ConfigContext, ExpoConfig } from '@expo/config';
import fs from 'fs';
import path from 'path';

const has = (p: string) => fs.existsSync(path.resolve(__dirname, p));

export default ({ config }: ConfigContext): ExpoConfig => {
  const name = 'Black History Trail';
  const slug = 'black-history-trail';

  const iosGoogleMapsApiKey = process.env.EXPO_PUBLIC_IOS_GOOGLE_MAPS_API_KEY;
  const androidGoogleMapsApiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY;

  return {
    name,
    slug,
    version: '1.0.0',
    orientation: 'portrait',
    icon: has('./assets/icon.png') ? './assets/icon.png' : undefined,
    splash: has('./assets/splash.png')
      ? { image: './assets/splash.png', resizeMode: 'contain', backgroundColor: '#154777' }
      : undefined,
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.blackhistorytrail.app',
      infoPlist: {
        NSCameraUsageDescription: 'This app uses the camera to scan QR codes at historical sites.',
      },
      config: iosGoogleMapsApiKey ? { googleMapsApiKey: iosGoogleMapsApiKey } : undefined,
    },
    android: {
      adaptiveIcon: has('./assets/adaptive-icon.png')
        ? { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#154777' }
        : undefined,
      package: 'com.blackhistorytrail.app',
      permissions: ['CAMERA'],
      config: androidGoogleMapsApiKey ? { googleMaps: { apiKey: androidGoogleMapsApiKey } } : undefined,
    },
    web: {
      favicon: has('./assets/favicon.png') ? './assets/favicon.png' : undefined,
    },
    plugins: [
      // Ensure native permission strings and setup are included in prebuilds
      'expo-barcode-scanner',
      'expo-secure-store',
    ],
  };
};

