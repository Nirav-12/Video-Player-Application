import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // or any icon library
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VideoScreen from "../screens/VideoScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import PlayVideo from "../screens/PlayVideo";

// epKFrVylGEgznmEv

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <>
      <PlayVideo />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
        tabBarActiveTintColor: "#4E9CA8",
        tabBarInactiveTintColor: "white",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeTabs") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
