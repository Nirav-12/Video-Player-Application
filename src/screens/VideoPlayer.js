import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Video } from "expo-av";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Directions } from "react-native-gesture-handler";
import * as ScreenOrientation from "expo-screen-orientation";

const { width, height } = Dimensions.get("window");
const miniMizedWidth = 120;
const miniMizedHieght = 70;

const VideoPlayer = ({ props, closePlayer }) => {
  const { description, thumbnail_url, title, video_url } = props;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isMinimized = useSharedValue(false); // State for tracking minimized state
  const videoRef = useRef(null);
  const [mini, setMini] = useState(false);
  const [status, setStatus] = React.useState({});
  const [inFullscreen, setInFullsreen] = useState(false);

  const showVideoInFullscreen = async () => {
    await videoRef.current.presentFullscreenPlayer();
  };

  const flingUpGesture = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      console.log("Fling Up");
      if (!isMinimized.value) {
        runOnJS(showVideoInFullscreen)();
      }
    });

  const flingDownGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => {
      console.log("Fling Down");
      // Snap to the bottom-right corner
      if (!isMinimized.value) {
        // setMini(true);
        isMinimized.value = true; // Set to true to trigger minimized state
        translateX.value = withTiming(0); // 200 is the width of the minimized container
        translateY.value = withTiming(height - 120); // 150 is the height of the minimized container
        runOnJS(setMini)(true);
      }
    });

  const toggleMinimize = async () => {
    // Toggle minimized state
    isMinimized.value = false;
    setMini(false);

    // Reset to initial position and size when maximizing
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
  };

  const handleContainerPress = () => {
    if (isMinimized.value) {
      toggleMinimize();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      width: withTiming(isMinimized.value ? miniMizedWidth : width),
      height: withTiming(isMinimized.value ? miniMizedHieght : 300),
    };
  });

  const animatedStyleContainer = useAnimatedStyle(() => {
    return {
      height: withDelay(100, withTiming(isMinimized.value ? 0 : height)),
      opacity: withTiming(isMinimized.value ? 0 : 1),
      paddingTop: withTiming(isMinimized.value ? 0 : 300),
    };
  });

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    console.log(
      "------------------->>>>>>>>>>>>>fullscreenUpdate",
      fullscreenUpdate
    );
    if (fullscreenUpdate == 1) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setInFullsreen(!inFullscreen);
    } else if (fullscreenUpdate == 3) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
      setInFullsreen(!inFullscreen);
    }
  };

  const composedGesture = Gesture.Race(flingUpGesture, flingDownGesture);
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" hidden={true} />

      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.videoContainer, animatedStyle]}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              ...StyleSheet.absoluteFill,
              flexDirection: "row",
            }}
            onPress={handleContainerPress}
          >
            <Video
              ref={videoRef}
              source={{
                uri: video_url,
              }}
              style={styles.video}
              resizeMode="contain"
              onFullscreenUpdate={onFullscreenUpdate}
              useNativeControls={!mini} // Disable native controls
              shouldPlay={true} // Initially not playing
              usePoster={true} // if set to true, will display an image (whose source is set via the prop posterSource) while the video is loading.
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              posterSource={{
                uri: thumbnail_url,
              }}
            />
            <View style={styles.mini_txt_container}>
              <TouchableOpacity
                style={styles.mini_txt_btn}
                onPress={toggleMinimize} // Corrected onPress handler
              >
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {description}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.miniScreen_btn}
                onPress={() =>
                  status.isPlaying
                    ? videoRef.current.pauseAsync()
                    : videoRef.current.playAsync()
                }
              >
                <Feather
                  name={status.isPlaying ? "pause" : "play"}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.miniScreen_btn}
                onPress={closePlayer}
              >
                <Ionicons name="close-circle" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
      <Animated.View
        style={[animatedStyleContainer, { backgroundColor: "white" }]}
      >
        <View style={{ padding: 20 }}>
          <Text style={[styles.title, { fontSize: 25 }]}>{title}</Text>
          <Text style={[styles.description, { fontSize: 18 }]}>
            {description}
          </Text>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
  },
  videoContainer: {
    backgroundColor: "black",
    zIndex: 2, // Ensure video container is above other elements
    position: "absolute",
  },
  video: {
    width: "100%",
    height: "100%",
    zIndex: 2, // Ensure video is above other elements
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 11,
    color: "gray",
  },
  miniScreen_btn: {
    justifyContent: "center",
    padding: 15,
  },
  mini_txt_btn: {
    backgroundColor: "white",
    flex: 1,
    padding: 5,
    gap: 3,
  },
  mini_txt_container: {
    width: width - miniMizedWidth,
    flexDirection: "row",
    backgroundColor: "white",
  },
});

export default VideoPlayer;
