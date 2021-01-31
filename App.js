import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsPage from "./pages/Notifications";
import CameraPage from "./pages/Camera";
import LocationPage from "./pages/Location";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to 1"
        onPress={() => navigation.navigate("NotificationsPage")}
      />
      <Button
        title="Go to 2"
        onPress={() => navigation.navigate("CameraPage")}
      />
      <Button
        title="Go to 3"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
