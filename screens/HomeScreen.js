import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const videos = [
  {id: '1', title: 'Video 1', description: 'Description 1'},
  {id: '2', title: 'Video 2', description: 'Description 2'},
  // Add more videos as needed
];

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Video', {video: item})}>
            <View style={styles.videoItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  videoItem: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;
