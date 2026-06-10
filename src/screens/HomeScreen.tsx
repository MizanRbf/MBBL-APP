import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Videos Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.videoButton}
        onPress={() => navigation.navigate('Videos')}
      >
        <Text style={styles.icon}>🎥</Text>

        <View>
          <Text style={styles.buttonTitle}>Watch The Classes</Text>

          <Text style={styles.buttonDescription}>ভিডিও ক্লাস দেখুন</Text>
        </View>
      </TouchableOpacity>

      {/* Books Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.bookButton}
        onPress={() => navigation.navigate('Books')}
      >
        <Text style={styles.icon}>📚</Text>

        <View>
          <Text style={styles.buttonTitle}>Download The Books</Text>

          <Text style={styles.buttonDescription}>Collect the pdf books</Text>
        </View>
      </TouchableOpacity>

      {/* Arabic Dept Contact Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.arabicButton}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.icon}>🏛️</Text>

        <View>
          <Text style={styles.buttonTitle}>RU Arabic Contact</Text>

          <Text style={styles.buttonDescription}>
            Get in touch with the Arabic Dept.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Mizan's Brain Boost Lab™ © 2026 All Rights Reserved
        </Text>

        <Text style={styles.footerSubText}>
          Developed by{' '}
          <Text style={styles.footerBoldText}>Mizan Al Muhammadi</Text>
        </Text>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#F4F8F5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D530E',
    padding: 20,
    marginBottom: 10,
    borderRadius: 16,
    elevation: 5,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F2020',
    padding: 20,
    marginBottom: 10,
    borderRadius: 16,
    elevation: 5,
  },
  arabicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    padding: 20,

    marginBottom: 20,
    borderRadius: 16,
    elevation: 5,
  },
  icon: {
    fontSize: 36,
    marginRight: 15,
    color: '#FFFFFF',
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
