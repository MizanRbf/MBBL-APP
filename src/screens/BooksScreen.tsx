import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { books } from '../data/books';

export default function BooksScreen() {
  return (
    <FlatList
      data={books}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />

          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    margin: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 3, // Android shadow
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
