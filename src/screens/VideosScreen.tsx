import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';

export default function VideosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
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
