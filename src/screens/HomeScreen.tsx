import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
});
