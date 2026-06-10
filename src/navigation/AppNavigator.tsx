import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BooksScreen from '../screens/BooksScreen';
import VideosScreen from '../screens/VideosScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Books" component={BooksScreen} />
      <Stack.Screen name="Videos" component={VideosScreen} />
    </Stack.Navigator>
  );
}
