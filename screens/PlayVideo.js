import { View, Text, DeviceEventEmitter } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import VideoScreen from "./VideoScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
const PlayVideo = () => {
  const [playVideo, setPlayVideo] = useState(null);

  useEffect(() => {
    DeviceEventEmitter.addListener("playVideo", (props) => {
      console.log("-------->>> playvideo", props);
      setPlayVideo(props);
    });
    DeviceEventEmitter.addListener("hideAll", (props) => {
      setPlayVideo(null);
    });

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  const videoRef = useRef(null);
  const isMinimized = useSharedValue(false); // State for tracking minimized state

  return <>{playVideo ? <VideoScreen /> : null}</>;
};

PlayVideo.play = (val) => {
  DeviceEventEmitter.emit("playVideo", val);
};

PlayVideo.close = () => {
  DeviceEventEmitter.emit("close");
};
export default PlayVideo;
