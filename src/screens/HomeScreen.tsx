import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('Books')}
      >
        <Text style={styles.buttonText}>📚 বই ডাউনলোড করুন</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.videoButton}
        onPress={() => navigation.navigate('Videos')}
      >
        <Text style={styles.buttonText}>🎥 ভিডিও দেখুন</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  videoButton: {
    backgroundColor: '#dc2626',
    padding: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
