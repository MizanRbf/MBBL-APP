import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../components/Footer';
import DateAndTime from '../components/WelcomeScreen/DateAndTime';
import LogoAndTitle from '../components/WelcomeScreen/LogoAndTitle';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <LinearGradient colors={['#F6FFDC', '#FFFFFF']} style={styles.container}>
      {/* Date and Time */}
      <DateAndTime />

      {/* Logo and Title */}
      <LogoAndTitle />

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Tap to Start</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startButton: {
    marginTop: 30,
    backgroundColor: '#48A111',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
