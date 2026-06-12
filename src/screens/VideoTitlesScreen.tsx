import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { videoCategories } from '../data/videos';

export default function VideoTitlesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={videoCategories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Videos', {
                videos: item.videos,
                title: item.title,
              })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
