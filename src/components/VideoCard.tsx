import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

interface Props {
  video: {
    id: string;
    title: string;
    videoUrl: string;
  };
}

export default function VideoCard({ video }: Props) {
  const openVideo = () => {
    Linking.openURL(video.videoUrl);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={openVideo}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>

        <Text style={styles.buttonText}>▶ ভিডিও দেখুন</Text>
      </View>
    </TouchableOpacity>
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
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonText: {
    color: '#0D530E',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#0D530E',
    padding: 8,
    borderRadius: 4,
  },
});
