import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import PlayVideo from "./PlayVideo";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../../lib/supabase";
import VideoCard from "../components/VideoCard";

const HomeScreen = ({ navigation }) => {
  const { session } = useContext(AuthContext);
  const [videoList, setVideoList] = useState([
    {
      created_at: "2024-07-15T06:57:21.632903+00:00",
      description: null,
      id: 4,
      thumbnail_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/Wood_Pecker__Deer_And_Tortoise___Jataka_Tales_In_English___Animation___Cartoon_Stories_For_Kids.webp?t=2024-07-15T06%3A56%3A54.272Z ",
      title:
        "Wood Pecker, Deer And Tortoise - Jataka Tales In English - Animation / Cartoon Stories For Kids",
      video_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/Wood_Pecker__Deer_And_Tortoise___Jataka_Tales_In_English___Animation___Cartoon_Stories_For_Kids.mp4",
    },
    {
      created_at: "2024-07-15T06:52:34.706032+00:00",
      description:
        "Fox And The Otters - Jataka Tales In English - Animation / Cartoon Stories For Kids",
      id: 1,
      thumbnail_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/%20Fox%20And%20The%20Otters%20-%20Jataka%20Tales%20In%20English.webp?t=2024-07-15T06%3A50%3A31.758Z",
      title: "Fox And The Otters",
      video_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/%20Fox%20And%20The%20Otters%20-%20Jataka%20Tales%20In%20English.mp4?t=2024-07-15T06%3A50%3A20.588Z",
    },
    {
      created_at: "2024-07-15T06:55:42.60963+00:00",
      description:
        "Greedy Crow - Jataka Tales In English - Animation / Cartoon Stories For Kids",
      id: 2,
      thumbnail_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/Greedy_Crow___Jataka_Tales_In_English___Animation___Cartoon_Stories_For_Kids.webp?t=2024-07-15T06%3A55%3A06.881Z",
      title: "Greedy Crow",
      video_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/Greedy_Crow___Jataka_Tales_In_English___Animation___Cartoon_Stories_For_Kids.mp4?t=2024-07-15T06%3A54%3A58.464Z",
    },
    {
      created_at: "2024-07-15T06:56:32.434201+00:00",
      description:
        "The Clever She Goat - Jataka Tales In English - Animation / Cartoon Stories For Kids ",
      id: 3,
      thumbnail_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/The_Clever_She_Goat___Jataka_Tales_In_English___Animation___Cartoon_Stories_For_Kids.webp?t=2024-07-15T06%3A56%3A02.141Z",
      title:
        "The Clever She Goat - Jataka Tales In English - Animation / Cartoon Stories For Kids ",
      video_url:
        "https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/test/video/The_Clever_She_Goat___Jataka_Tales_In_English___Animation___Cartoon_Stories_For_Kids.mp4?t=2024-07-15T06%3A55%3A52.835Z",
    },
  ]);

  useEffect(() => {
    // getVideoList();
    console.log("mete data", session?.user?.user_metadata);

    if (!session?.user?.user_metadata?.table_created) {
      console.log("add data call");
      addData();
    } else {
      console.log("add data no call");
    }
  }, []);

  const getVideoList = async () => {
    let { data: Videos, error } = await supabase
      .from("Videos")
      .select("*")
      .range(videoList.length, videoList.length + 1);

    console.log(error);
    setVideoList((videoList) => [...videoList, ...Videos]);
  };

  const addData = async () => {
    const { error } = await supabase.from("User").insert({
      name: session?.user?.user_metadata?.name,
      email: session?.user?.user_metadata?.email,
    });
    if (error) {
      const { data, error } = await supabase.auth.updateUser({
        data: { table_created: true },
      });
    }
    console.log("----->>>>>>>>error", error);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header_container}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
          <Image
            source={require("../../assets/image01.png")}
            style={styles.logo}
          />

          <Text style={styles.header_txt}>ReoKids</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videoList}
        keyExtractor={(item) => item.id}
        // onEndReached={getVideoList}
        renderItem={({ item }) => (
          <VideoCard item={item} onSubmit={() => PlayVideo.play(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "White",
  },
  header_container: {
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_txt: {
    color: "#4E9CA8",
    fontSize: 22,
    fontWeight: "bold",
  },

  logo: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: "#4E9CA8",
    borderRadius: 99,
  },
});

export default HomeScreen;
