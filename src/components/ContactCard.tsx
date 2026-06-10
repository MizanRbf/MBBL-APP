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
  contact: {
    id: number;
    name: string;
    phone: string;
    whatsapp: string;
  };
}

export default function ContactCard({ contact }: Props) {
  const callContact = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const sendWhatsAppMessage = () => {
    Linking.openURL(`https://wa.me/${contact.whatsapp}`);
  };

  return (
    <View style={styles.card}>
      {/* Avatar (optional default image) */}
      <Image
        source={{
          uri: 'https://i.ibb.co/2nzw2kV/user.png',
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{contact.name}</Text>
        <Text style={styles.subtitle}>{contact.phone}</Text>

        <View style={styles.buttonRow}>
          {/* Phone */}
          <TouchableOpacity style={styles.button} onPress={callContact}>
            <Text style={styles.buttonText}>📞 Call</Text>
          </TouchableOpacity>
          {/* WhatsApp */}
          <TouchableOpacity
            style={[styles.button, styles.whatsapp]}
            onPress={sendWhatsAppMessage}
          >
            <Text style={styles.buttonText}>💬 WhatsApp</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#0D530E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  whatsapp: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
