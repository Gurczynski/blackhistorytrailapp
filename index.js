import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './src/App';

// This ensures the app works in Expo Go and in a bare React Native app.
registerRootComponent(App);
