# Black History Trail App

A React Native Expo app for exploring Black history sites and trails in Daytona Beach.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed on your system

### Using Docker (Recommended)

1. **Build and start the development environment:**
   ```bash
   docker-compose up --build
   ```

2. **Access the app:**
   - Open your browser and go to `http://localhost:19006` (Expo DevTools)
   - Or scan the QR code shown in the terminal with the Expo Go app

3. **Stop the development environment:**
   ```bash
   docker-compose down
   ```

### Alternative: Using Docker Commands

```bash
# Build the Docker image
docker build -t black-history-trail .

# Run the container
docker run -it -p 19000:19000 -p 19001:19001 -p 19006:19006 -v $(pwd):/app black-history-trail

# Or using docker-compose
docker-compose up
```

## 🛠 Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

### Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/       # App screens
├── navigation/    # Navigation configuration
├── constants/     # App constants (colors, fonts)
├── services/      # API services (GIS, OpenAI)
├── types/         # TypeScript type definitions
└── data/          # Static data files
```

## 🏗 Docker Configuration

- **Node.js Version:** 18 LTS (compatible with Expo SDK 50)
- **Ports:**
  - `19000`: Expo DevTools and web interface
  - `19001`: iOS development
  - `19006`: Android development
- **Volumes:** Source code is mounted for live reloading

## 🔧 Environment Variables

Copy `.env` to `.env.local` and configure:

- `EXPO_PUBLIC_GIS_BASE_URL` - ArcGIS base URL
- `EXPO_PUBLIC_GIS_TOKEN` - ArcGIS authentication token
- `EXPO_PUBLIC_OPENAI_MODEL` - OpenAI model name
- `EXPO_PUBLIC_OPENAI_API_KEY` - OpenAI API key

## 📱 Features

- **QR Code Scanner** - Scan QR codes at historical sites
- **Interactive Maps** - View parks and historical locations
- **Event Listings** - Browse upcoming events
- **Service Information** - Access city services
- **Scavenger Hunts** - Interactive exploration activities

## 🔒 Security

The app uses `expo-secure-store` for sensitive data storage and environment variables for configuration.

## 📄 License

This project is licensed under the MIT License.
