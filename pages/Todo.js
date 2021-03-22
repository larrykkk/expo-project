import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, ScrollView, StyleSheet, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  View,
  Assets,
  Constants,
  Button,
  Colors,
  Typography,
} from "react-native-ui-lib"; //eslint-disable-line

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
};

export default function SensorPage(props) {
  const [list, setList] = useState([]);
  const [value, onChangeText] = React.useState("新增 task");

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View>
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
              borderRadius: 30,
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />

          <Ionicons
            name="close"
            size={24}
            color="black"
            style={{ position: "absolute", right: 5, top: 5 }}
            onPress={() => onChangeText("")}
          />
        </View>

        <Button
          backgroundColor="#30B650"
          label="SHUFFLE PLAY"
          labelStyle={{ fontWeight: "600" }}
          style={{ marginBottom: 20, marginTop: 10 }}
          enableShadow
          onPress={() => {
            if (value) {
              setList([value, ...list]);
            }
          }}
        />
      </View>
      <ScrollView>
        <Text>總比數: {list.length}</Text>

        {list.map((x, key) => {
          return (
            <View key={key}>
              <Text>{x}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
