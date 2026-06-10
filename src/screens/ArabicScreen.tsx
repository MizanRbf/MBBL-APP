import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { contacts } from '../data/contact';
import ContactCard from '../components/ContactCard';

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ContactCard contact={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContainer: {
    padding: 10,
  },
});
