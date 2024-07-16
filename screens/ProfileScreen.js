import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { supabase } from "../lib/supabase";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { session } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let { data: User, error } = await supabase
      .from("User")
      .select("*")
      .eq("email", session?.user?.user_metadata?.email);

    console.log("user table data", ...User);

    setUserData(...User);
    console.log(error);
  };

  const [name, setName] = useState("John Doe"); // Example name
  const [profilePhoto, setProfilePhoto] = useState(
    require("../assets/icon.png")
  ); // Example profile photo

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("Sign Out Error", error);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* haeder */}
      <View style={styles.header_container}>
        <Text style={styles.header_txt}>Profile</Text>
      </View>

      {/* body  */}

      {/* User image container */}
      <View
        style={{
          justifyContent: "center",
          marginTop: 50,
          flexDirection: "row",
          alignItems: "flex-end",
          marginLeft: 15,
        }}
      >
        {userData?.profileImage ? (
          <Image
            source={{ uri: userData?.profileImage }}
            style={styles.profilePhoto}
          />
        ) : (
          <Image source={profilePhoto} style={styles.profilePhoto} />
        )}
        {!userData?.profileImage && (
          <TouchableOpacity style={styles.changePhotoButton}>
            <FontAwesome5 name="edit" size={15} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.user_txt}>{userData?.name}</Text>
        <Text style={styles.email_txt}>{userData?.email}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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

  profilePhoto: {
    width: 70,
    height: 70,
    borderRadius: 99,
  },
  textContainer: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  user_txt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email_txt: {
    fontSize: 14,
    color: "gray",
  },
  changePhotoButton: {
    marginTop: 10,
  },

  button: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
