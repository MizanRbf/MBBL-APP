import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BooksScreen from '../screens/BooksScreen';
import VideosScreen from '../screens/VideosScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ArabicScreen from '../screens/ArabicScreen';
import VideoTitlesScreen from '../screens/VideoTitlesScreen';
import QiblaScreen from '../screens/CompassScreen';
import LevelScreen from '../screens/LevelScreen';
import ForecastScreen from '../screens/ForecastScreen';
import CalendarScreen from '../screens/CalenderScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Welcome */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      {/* Home */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#1A312C' },
          headerTintColor: '#FFF',
          title: 'All Features',
        }}
      />

      {/* Books */}
      <Stack.Screen
        name="Books"
        component={BooksScreen}
        options={{
          headerStyle: { backgroundColor: '#1A312C' },
          headerTintColor: '#FFF',
          title: 'Books',
        }}
      />

      {/* Videos Titles */}
      <Stack.Screen
        name="VideoTitles"
        component={VideoTitlesScreen}
        options={{
          headerStyle: { backgroundColor: '#1A312C' },
          headerTintColor: '#FFF',
          title: 'Video Titles',
        }}
      />

      {/* Videos */}
      <Stack.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          headerStyle: { backgroundColor: '#1A312C' },
          headerTintColor: '#FFF',
          title: 'Videos',
        }}
      />

      {/* Contacts */}
      <Stack.Screen
        name="Contacts"
        component={ArabicScreen}
        options={{
          headerStyle: { backgroundColor: '#1A312C' },
          headerTintColor: '#FFF',
          title: 'RU Arabic Contacts',
        }}
      />

      {/* Compass */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="QiblaScreen"
        component={QiblaScreen}
      />

      {/* Level */}
      <Stack.Screen
        name="LevelScreen"
        component={LevelScreen}
        options={{ headerShown: false }}
      />

      {/* Forecast */}
      <Stack.Screen
        name="ForecastScreen"
        component={ForecastScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
        }}
      />
    </Stack.Navigator>
  );
}
