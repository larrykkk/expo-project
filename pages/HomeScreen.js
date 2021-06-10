import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicListScreen from "~/components/BasicListScreen";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <BasicListScreen navigation={navigation}></BasicListScreen>
    </SafeAreaView>
  );
}
