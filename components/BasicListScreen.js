import React, { Component } from "react";
import { StyleSheet, Alert, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  AnimatableManager,
  Colors,
  BorderRadiuses,
  ListItem,
  Text,
} from "react-native-ui-lib"; //eslint-disable-line
// import orders from "../../data/orders";
// import MapView from "react-native-maps";
// import { NavigationContainer } from "@reac t-navigation/native";

export default class BasicListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
    };
  }

  keyExtractor = (item) => item.stationNo;

  componentDidMount() {
    fetch("https://tinyurl.com/y4utsed3")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ data: json.data });
        console.log(this.state.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  renderRow(row, id) {
    console.log(this.props.navigation);
    // const statusColor =
    //   row.inventory.status === "Paid" ? Colors.green30 : Colors.red30;
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={77.5}
          onPress={() => {
            this.props.navigation.navigate("Map", {
              itemId: 86,
              otherParam: "anything you want here",
            });
          }}
        >
          <ListItem.Part left>
            <Animatable.Image
              source={require("../assets/watermark_icon-icons.com_49331.png")}
              style={styles.image}
              {...imageAnimationProps}
            />
          </ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[styles.border, { paddingRight: 17 }]}
          >
            <ListItem.Part containerStyle={{ marginBottom: 3 }}>
              <Text
                dark10
                text70
                style={{ flex: 1, marginRight: 10 }}
                numberOfLines={1}
              >
                {row.stationName}
              </Text>
              <Text dark10 text70 style={{ marginTop: 2 }}>
                {row.levelOut}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10 }}
                text90
                dark40
                numberOfLines={1}
              >{`記錄時間:${row.recTime}`}</Text>
              <Text text90 numberOfLines={1}>
                外水位值
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  }

  render() {
    // const { navigation } = this.props;
    // console.log(navigation);
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item, index }) => this.renderRow(item, index)}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark70,
  },
});
