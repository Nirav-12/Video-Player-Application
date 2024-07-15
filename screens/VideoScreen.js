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
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const miniMizedWidth = 120;
const miniMizedHieght = 70;

const VideoPlayer = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isMinimized = useSharedValue(false); // State for tracking minimized state
  const videoRef = useRef(null);

  const panGesture = Gesture.Pan().onEnd(() => {
    // Snap to the bottom-right corner
    if (!isMinimized.value) {
      isMinimized.value = true; // Set to true to trigger minimized state
      translateX.value = withSpring(0); // 200 is the width of the minimized container
      translateY.value = withSpring(height - 50); // 150 is the height of the minimized container
    }
  });

  const toggleMinimize = () => {
    // Toggle minimized state
    isMinimized.value = false;

    // Reset to initial position and size when maximizing
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const handleContainerPress = () => {
    console.log("--------------------->>>>>>");
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
      width: withSpring(isMinimized.value ? miniMizedWidth : width),
      height: withSpring(isMinimized.value ? miniMizedHieght : 300),
    };
  });

  const animatedStyleContainer = useAnimatedStyle(() => {
    return {
      height: isMinimized.value ? 0 : height,
    };
  });

  return (
    <GestureHandlerRootView
      style={{
        backgroundColor: "red",
        position: "absolute",
        zIndex: 1,
        width: "100%",
      }}
    >
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
              useNativeControls // Disable native controls
              shouldPlay={true} // Initially not playing
            />
            <View
              style={{
                backgroundColor: "red",
                width: width - miniMizedWidth,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "blue",
                  width: width - miniMizedWidth - 100,
                }}
                onPress={toggleMinimize} // Corrected onPress handler
              ></TouchableOpacity>
              <Text>Hello</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[animatedStyleContainer]} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: "blue",
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

// import React, { useRef } from "react";
// import {
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   View,
//   Text,
// } from "react-native";
// import { Video } from "expo-av";
// import {
//   GestureDetector,
//   Gesture,
//   TapGestureHandler,
// } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";

// const { width, height } = Dimensions.get("window");
// const miniMizedWidth = 120;
// const miniMizedHieght = 70;

// const VideoPlayer = () => {
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const isMinimized = useSharedValue(false); // State for tracking minimized state
//   const videoRef = useRef(null);

//   const panGesture = Gesture.Pan().onEnd(() => {
//     // Snap to the bottom-right corner
//     if (!isMinimized.value) {
//       isMinimized.value = true; // Set to true to trigger minimized state
//       translateX.value = withSpring(0); // 200 is the width of the minimized container
//       translateY.value = withSpring(height - 150); // 150 is the height of the minimized container
//     }
//   });

//   const toggleMinimize = () => {
//     console.log("toggleMinimize");
//     console.log("ref -->>", videoRef.current.props.useNativeControls);
//     console.log("ref -->>", videoRef.current);

//     // for (const property in videoRef.current) {
//     //   console.log(`${property}: ${JSON.stringify(videoRef.current[property])}`);
//     // }

//     // Toggle minimized state
//     isMinimized.value = false;

//     // Reset to initial position and size when maximizing
//     translateX.value = withSpring(0);
//     translateY.value = withSpring(0);
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//       width: withSpring(isMinimized.value ? miniMizedWidth : width),
//       height: withSpring(isMinimized.value ? miniMizedHieght : 300),
//     };
//   });

//   if (!isMinimized) {
//     return (
//       <View>
//         <Text>Hello</Text>
//       </View>
//     );
//   }

//   return (
//     <GestureDetector gesture={panGesture}>
//       <Animated.View style={[styles.videoContainer, animatedStyle]}>
//         <TouchableOpacity
//           activeOpacity={1}
//           disabled={isMinimized.value}
//           style={{
//             ...StyleSheet.absoluteFill,
//             flexDirection: "row",
//           }}
//           onPress={toggleMinimize} // Corrected onPress handler
//         >
//           <Video
//             ref={videoRef}
//             source={{
//               uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//             }}
//             style={styles.video}
//             resizeMode="contain"
//             useNativeControls
//             shouldPlay
//           />
//           <View
//             style={{
//               backgroundColor: "red",
//               width: width - miniMizedWidth,
//               flexDirection: "row",
//             }}
//           >
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "blue",
//                 width: width - miniMizedWidth - 100,
//               }}
//               onPress={toggleMinimize} // Corrected onPress handler
//             ></TouchableOpacity>
//             <Text>Hello</Text>
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// const styles = StyleSheet.create({
//   videoContainer: {
//     position: "absolute",
//     width: "100%", // Initially full width
//     height: 300, // Initially height of 300
//     backgroundColor: "black",
//     zIndex: 1, // Ensure video container is above other elements\
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//     zIndex: 2, // Ensure video is above other elements
//   },
// });

// export default VideoPlayer;
