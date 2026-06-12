import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Mizan's Brain Boost Lab™ © 2026 All Rights Reserved
      </Text>

      <Text style={styles.footerSubText}>
        Developed by{' '}
        <Text
          style={styles.footerBoldText}
          onPress={() => Linking.openURL('https://mizanrbf.netlify.app/')}
        >
          Mizan Al Muhammadi
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },

  footerSubText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },

  footerBoldText: {
    fontWeight: 'bold',
    color: '#48A111',
  },
});
