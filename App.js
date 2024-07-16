import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import React from "react";
import Navigation from "./index";
import { AuthProvider } from "./src/context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
