import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { supabase } from "../lib/supabase";

const ProfileScreen = () => {
  const [name, setName] = useState("John Doe"); // Example name
  const [profilePhoto, setProfilePhoto] = useState(
    require("../assets/icon.png")
  ); // Example profile photo

  const handleSave = () => {
    // Handle saving profile changes
    console.log("Saving profile changes:", { name, profilePhoto });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("Sign Out Error", error);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profilePhoto} style={styles.profilePhoto} />
        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    color: "blue",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4E9CA8",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
