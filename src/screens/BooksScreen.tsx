import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { books } from '../data/books';
import BookCard from '../components/BookCard';

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BookCard book={item} />}
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
