import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BooksScreen from '../screens/BooksScreen';
import VideosScreen from '../screens/VideosScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ArabicScreen from '../screens/ArabicScreen';
import VideoTitlesScreen from '../screens/VideoTitlesScreen';
import QiblaScreen from '../screens/QiblaScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Topics',
        }}
      />
      <Stack.Screen name="Books" component={BooksScreen} />
      <Stack.Screen
        name="VideoTitles"
        component={VideoTitlesScreen}
        options={{
          title: 'Search by Titles',
        }}
      />
      <Stack.Screen name="Videos" component={VideosScreen} />
      <Stack.Screen name="Contacts" component={ArabicScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="QiblaScreen"
        component={QiblaScreen}
      />
    </Stack.Navigator>
  );
}
