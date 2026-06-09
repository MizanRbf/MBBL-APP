import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

interface Props {
  book: {
    id: string;
    title: string;
    thumbnail: string;
    pdfUrl: string;
  };
}

export default function BookCard({ book }: Props) {
  const downloadBook = () => {
    Linking.openURL(book.pdfUrl);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: book.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>

        <TouchableOpacity style={styles.button} onPress={downloadBook}>
          <Text style={styles.buttonText}>📥 Download PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
