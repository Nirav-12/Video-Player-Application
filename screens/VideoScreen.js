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
import { AntDesign } from "@expo/vector-icons";
import PlayVideo from "./PlayVideo";

const { width, height } = Dimensions.get("window");
const miniMizedWidth = 120;
const miniMizedHieght = 70;

const VideoPlayer = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isMinimized = useSharedValue(false); // State for tracking minimized state
  const videoRef = useRef(null);
  const [mini, setMini] = useState(false);

  const panGesture = Gesture.Pan().onEnd(() => {
    // Snap to the bottom-right corner
    if (!isMinimized.value) {
      // setMini(true);
      isMinimized.value = true; // Set to true to trigger minimized state
      translateX.value = withTiming(0); // 200 is the width of the minimized container
      translateY.value = withTiming(height - 120); // 150 is the height of the minimized container
      runOnJS(setMini)(true);
    }
  });

  const toggleMinimize = () => {
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
    };
  });

  return (
    <GestureHandlerRootView
      style={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
      }}
    >
      <StatusBar style="light" hidden={true} />

      <GestureDetector gesture={panGesture}>
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
                uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              }}
              style={styles.video}
              resizeMode="contain"
              useNativeControls={!mini} // Disable native controls
              shouldPlay={true} // Initially not playing
            />
            <View
              style={{
                width: width - miniMizedWidth,
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  flex: 1,
                }}
                onPress={toggleMinimize} // Corrected onPress handler
              ></TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  padding: 15,
                }}
              >
                <AntDesign name="pause" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  padding: 15,
                }}
                onPress={() => PlayVideo.close()}
              >
                <AntDesign name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
      <Animated.View
        style={[animatedStyleContainer, { backgroundColor: "white" }]}
      ></Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
});

export default VideoPlayer;
