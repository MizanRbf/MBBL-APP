import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Mizan's Brain Boost Lab</Text>
        </View>

        <Text style={styles.subtitle}>Learn • Practice • Grow</Text>
      </View>

      {/* Books Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.bookButton}
        onPress={() => navigation.navigate('Books')}
      >
        <Text style={styles.icon}>📚</Text>

        <View>
          <Text style={styles.buttonTitle}>বই ডাউনলোড করুন</Text>

          <Text style={styles.buttonDescription}>PDF বই ও শীট সংগ্রহ করুন</Text>
        </View>
      </TouchableOpacity>

      {/* Videos Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.videoButton}
        onPress={() => navigation.navigate('Videos')}
      >
        <Text style={styles.icon}>🎥</Text>

        <View>
          <Text style={styles.buttonTitle}>ভিডিও দেখুন</Text>

          <Text style={styles.buttonDescription}>শিক্ষামূলক ভিডিও দেখুন</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },

  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16A34A', // Green
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

  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5,
  },

  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },

  icon: {
    fontSize: 36,
    marginRight: 15,
  },

  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonDescription: {
    color: '#E5E7EB',
    marginTop: 4,
    fontSize: 13,
  },
});
