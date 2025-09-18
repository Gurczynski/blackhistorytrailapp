# Daytona Beach Mobile App

Official React Native mobile application for the City of Daytona Beach, providing residents and visitors with easy access to city services, events, parks information, and interactive features.

## Features

### 🏠 Home Screen
- City highlights and news
- Featured events carousel
- Quick access to popular services
- Search functionality

### 📅 Events
- Calendar view of city events
- Event details and locations
- Interactive date selection
- Event categories and filtering

### 🌳 Parks & Recreation
- Interactive park exploration
- Photo galleries with swipeable carousels
- Historical information
- QR code scanning for park information
- Scavenger hunt challenges
- Interactive maps with park locations

### 🏛️ City Services
- Utility bill payment
- Service applications
- Contact information
- Service categories and search
- Detailed service information

### 🔍 Search
- City-wide search functionality
- Service and information lookup
- Quick access to popular searches

## Technical Features

- **React Native** with TypeScript
- **React Navigation** for seamless navigation
- **QR Code Scanning** with react-native-qrcode-scanner
- **Maps Integration** with react-native-maps
- **Image Galleries** with swipeable carousels
- **Responsive Design** for iOS and Android
- **Offline Capability** with local data caching
- **Push Notifications** ready infrastructure

## Installation

### Prerequisites
- Node.js (>= 16)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd DaytonaBeachApp

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── constants/          # Colors, fonts, and other constants
├── data/              # Test data and API interfaces
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Configuration

### Environment Variables
The app uses local test data by default. To connect to real city services:

1. Update API endpoints in `src/constants/`
2. Configure authentication if required
3. Update data models in `src/types/`

### Customization
- **Colors**: Update `src/constants/Colors.ts`
- **Fonts**: Update `src/constants/Fonts.ts`
- **Data**: Replace test data in `src/data/testData.json`

## Features Implementation

### QR Code Scanning
- Uses device camera for QR code detection
- Provides contextual information about park locations
- Fallback simulation for testing

### Scavenger Hunt
- Interactive challenges with progress tracking
- GPS-based location verification (placeholder)
- Achievement system with badges

### Maps Integration
- Native map components
- Park location markers
- Directions and navigation

### Image Galleries
- Swipeable photo carousels
- Full-screen image viewing
- Photo sharing capabilities

## Deployment

### iOS App Store
1. Configure signing certificates
2. Update version in `ios/DaytonaBeachApp/Info.plist`
3. Build and archive in Xcode
4. Submit through App Store Connect

### Google Play Store
1. Generate signed APK/AAB
2. Update version in `android/app/build.gradle`
3. Upload through Google Play Console

## Data Integration

The app is structured to easily integrate with real city data sources:

- **Events**: Connect to city calendar API
- **Services**: Integrate with city service portal
- **Parks**: Connect to parks and recreation database
- **News**: Integrate with city news feed

## Accessibility

- VoiceOver/TalkBack support
- High contrast mode compatibility
- Large text support
- Keyboard navigation

## Performance

- Optimized image loading and caching
- Lazy loading for large lists
- Efficient navigation stack management
- Memory management for camera features

## Security

- Secure API communication
- Local data encryption for sensitive information
- Permission management for camera and location
- Input validation and sanitization

## Support

For technical support or feature requests, contact the City of Daytona Beach IT Department.

## License

© 2024 City of Daytona Beach. All rights reserved.