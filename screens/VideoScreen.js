import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const VideoScreen = ({route}) => {
  const {video} = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{uri: 'https://path/to/your/video.mp4'}} // Replace with actual video URL
        style={styles.video}
        controls
      />
      <Text style={styles.title}>{video.title}</Text>
      <Text style={styles.description}>{video.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    paddingHorizontal: 16,
  },
});

export default VideoScreen;
