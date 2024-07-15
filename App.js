import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";
import React from "react";
import { AuthProvider } from "./context/AuthProvider";
import Navigation from "./index";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
