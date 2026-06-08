import React from 'react';
import './global.css';
import { View, Text, StyleSheet } from 'react-native';
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.fontBold}>Hello, Maria</Text>
      <Text>I Love you jan</Text>
      <Text>তুমি ঘুমাও গিয়া</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
