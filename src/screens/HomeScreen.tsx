import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Books Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.bookButton}
        onPress={() => navigation.navigate('Books')}
      >
        <Text style={styles.icon}>📚</Text>

        <View>
          <Text style={styles.buttonTitle}>Download The Papers</Text>

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
          <Text style={styles.buttonTitle}>Watch The Classes</Text>

          <Text style={styles.buttonDescription}>ভিডিও ক্লাস দেখুন</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F2020',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5,
  },

  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D530E',
    padding: 20,
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
