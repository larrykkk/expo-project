import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
} from "native-base";
import { StyleSheet, Alert, FlatList } from "react-native";

export default class HeaderNoLeft extends Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {},
//   header: {
//     paddingRight: 15,
//     paddingLeft: 15,
//   },
//   content: {
//     display: "flex",
//     flex: 1,
//     justifyContent: "center",
//     padding: 15,
//   },
// });
