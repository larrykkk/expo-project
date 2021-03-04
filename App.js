import * as React from "react";
// import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotificationsPage from "./pages/Notifications";
import CameraPage from "./pages/Camera";
import LocationPage from "./pages/Location";
import HomeScreen from "./pages/HomeScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <CameraPage></CameraPage> */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Home") {
                return (
                  <Ionicons
                    name={focused ? "ios-home" : "ios-home-outline"}
                    size={size}
                    color={color}
                  />
                );
              } else {
                return (
                  <Ionicons
                    name={focused ? "ios-list" : "ios-list-outline"}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Notifications" component={NotificationsPage} />
          <Tab.Screen name="Camera" component={CameraPage} />
          <Tab.Screen name="Location" component={LocationPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
