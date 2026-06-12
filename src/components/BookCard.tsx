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
    writer: string;
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
        <Text style={styles.writer}>{book.writer}</Text>

        <TouchableOpacity style={styles.button} onPress={downloadBook}>
          <Text style={styles.buttonText}>📥 Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 5,
    marginBottom: 15,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  writer: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
    color: 'gray',
  },
  button: {
    backgroundColor: '#2C3947',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
