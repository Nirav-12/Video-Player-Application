import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("John Doe"); // Example name
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const GetImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!response.canceled) {
      setImage(response.assets[0].uri);
    }
  };

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name,
          table_created: false,
        },
      },
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View>
        <View
          style={{
            borderWidth: 1,
            height: 70,
            width: 70,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!image ? (
            <AntDesign name="user" size={24} color="black" />
          ) : (
            <Image
              source={image}
              style={{ height: 70, width: 70, borderRadius: 35 }}
            />
          )}
        </View>

        <TouchableOpacity onPress={() => GetImage()}>
          <Text style={{ color: "#108FE5" }}>+ Add photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={signUpWithEmail}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff6347",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
