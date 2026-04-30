// Expo app configuration (CommonJS) for SDK 54
const fs = require('fs');
const path = require('path');

const has = (p) => fs.existsSync(path.resolve(__dirname, p));

module.exports = () => {
  const iosGoogleMapsApiKey = process.env.EXPO_PUBLIC_IOS_GOOGLE_MAPS_API_KEY;
  const androidGoogleMapsApiKey = process.env.EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY;

  return {
    name: 'Black History Trail',
    slug: 'black-history-trail',
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
      config: iosGoogleMapsApiKey ? { googleMapsApiKey: iosGoogleMapsApiKey } : {},
    },
    android: {
      adaptiveIcon: has('./assets/adaptive-icon.png')
        ? { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#154777' }
        : undefined,
      package: 'com.blackhistorytrail.app',
      permissions: ['CAMERA'],
      config: androidGoogleMapsApiKey ? { googleMaps: { apiKey: androidGoogleMapsApiKey } } : {},
    },
    web: {
      favicon: has('./assets/favicon.png') ? './assets/favicon.png' : undefined,
    },
    plugins: [
      'expo-barcode-scanner',
      'expo-secure-store',
    ],
    extra: {
      eas: {
        projectId: '05464e42-7558-4abe-8d10-b0635d31e3b8',
      },
    },
  };
};
