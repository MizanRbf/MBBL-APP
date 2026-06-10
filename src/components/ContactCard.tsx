import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  contact: {
    id: number;
    name: string;
    title: string;
    image: string;
    phone: string;
  };
}

export default function ContactCard({ contact }: Props) {
  const callContact = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const copyNumber = () => {
    Clipboard.setString(contact.phone);
    Alert.alert('Copied', 'Phone number copied to clipboard');
  };

  return (
    <View style={styles.card}>
      {/* Image */}
      <Image
        source={require('../../assets/images/contactDefaultImage.webp')}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{contact.name}</Text>
        <Text style={styles.subtitle}>{contact.title}</Text>

        {/* Number row + copy icon */}
        <View style={styles.numberRow}>
          <Text style={styles.subtitle}>{contact.phone}</Text>

          <TouchableOpacity onPress={copyNumber} style={styles.copyBtn}>
            <Text style={styles.copyText}>⧉ Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Call button */}
        <TouchableOpacity style={styles.button} onPress={callContact}>
          <Text style={styles.buttonText}>📞 Immediate Call</Text>
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
    elevation: 4,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },

  numberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  copyBtn: {
    padding: 6,
  },

  copyText: {
    fontSize: 16,
    color: 'gray',
  },

  button: {
    backgroundColor: '#48A111',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
