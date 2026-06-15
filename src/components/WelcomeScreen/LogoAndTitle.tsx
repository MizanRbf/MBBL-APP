import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const LogoAndTitle = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Mizan's Brain Boost Lab</Text>
      </View>

      <Text style={styles.subtitle}>All in One Application</Text>
    </View>
  );
};

export default LogoAndTitle;

const styles = StyleSheet.create({
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
    fontFamily: 'EduAUVICWANTDots-Regular',
    fontWeight: 'bold',
    color: '#48A111',
    textAlign: 'center',
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
