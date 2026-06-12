import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

import { menuItems } from '../data/menu';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {menuItems.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={[styles.card, { backgroundColor: item.color }]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.icon}>{item.icon}</Text>

          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>{item.title}</Text>

            <Text style={styles.buttonDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Footer */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F5',
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 5,
  },

  icon: {
    fontSize: 36,
    marginRight: 15,
  },

  textContainer: {
    flex: 1,
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
    textAlign: 'center',
  },

  footerSubText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },

  footerBoldText: {
    fontWeight: 'bold',
    color: '#48A111',
  },
});
