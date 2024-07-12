import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const videos = [
  {id: '1', title: 'Video 1', description: 'Description 1'},
  {id: '2', title: 'Video 2', description: 'Description 2'},
  // Add more videos as needed
];

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredVideos}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
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

export default SearchScreen;
