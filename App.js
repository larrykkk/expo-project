import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsPage from "./pages/Notifications";
import CameraPage from "./pages/Camera";
import LocationPage from "./pages/Location";
import BasicListScreen from "./BasicListScreen.js";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Button
        title="Notifications"
        onPress={() => navigation.navigate("NotificationsPage")}
      />
      <Button
        title="Camera"
        onPress={() => navigation.navigate("CameraPage")}
      />
      <Button
        title="Location"
        onPress={() => navigation.navigate("LocationPage")}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NotificationsPage" component={NotificationsPage} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="LocationPage" component={LocationPage} />
        <Stack.Screen name="BasicListScreen" component={BasicListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
