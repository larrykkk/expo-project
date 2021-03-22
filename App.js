import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotificationsPage from "./pages/Notifications";
import CameraPage from "./pages/Camera";
import LocationPage from "./pages/Location";
import HomeScreen from "./pages/HomeScreen";
import SensorPage from "./pages/SensorPage";
import SettingPage from "./pages/Setting";

import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    async function getMoviesFromApi() {
      try {
        let response = await fetch("https://reactnative.dev/movies.json");
        let responseJson = await response.json();
        return responseJson.movies;
      } catch (error) {
        console.error(error);
      }
    }

    const res = getMoviesFromApi();
    console.log(res);
  }, []);

  return (
    <SafeAreaProvider>
      {/* <CameraPage></CameraPage> */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "首頁") {
                return (
                  <Ionicons
                    name={focused ? "ios-home" : "ios-home-outline"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "推播") {
                return (
                  <Ionicons name="ios-notifications" size={24} color={color} />
                );
              } else if (route.name === "相機") {
                return <Ionicons name="ios-camera" size={24} color={color} />;
              } else if (route.name === "定位") {
                return (
                  <Ionicons name="ios-location-sharp" size={24} color={color} />
                );
              } else if (route.name === "感應器") {
                return (
                  <Ionicons name="ios-build-sharp" size={24} color={color} />
                );
              } else if (route.name === "設定") {
                return (
                  <Ionicons name="settings-outline" size={24} color={color} />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="首頁" component={HomeScreen} />
          <Tab.Screen name="推播" component={NotificationsPage} />
          <Tab.Screen name="相機" component={CameraPage} />
          <Tab.Screen name="定位" component={LocationPage} />
          <Tab.Screen name="感應器" component={SensorPage} />
          <Tab.Screen name="設定" component={SettingPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
