import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Mizan's Brain Boost Lab</Text>
        </View>

        <Text style={styles.subtitle}>Learn • Practice • Grow</Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Start Learning...</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#FF6A1C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },

  appName: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'EduAUVICWANTDots-Bold',
    color: '#48A111',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F8F5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B7280',
  },
});
