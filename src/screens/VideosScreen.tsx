import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import VideoCard from '../components/VideoCard';

export default function VideosScreen({ route }: any) {
  const { videos } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
