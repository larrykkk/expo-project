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

const orders = [
  {
    name: "#100201",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Paid",
      quantity: 1,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/d911269bdf7972c9a59ba30440cb3789.jpg_128",
  },
  {
    name: "#100203",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Paid",
      quantity: 2,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_5c6d2cd3b71a41caa54309301e1dd0d7.jpg_128",
  },
  {
    name: "#100207",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Unpaid",
      quantity: 1,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_7153ff06297c484498f9d6662e26d6d5.jpg_128",
  },
  {
    name: "#100208",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Out of Stock",
      quantity: 0,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_e008aa7681f443b3be63a1fe86c10cfd.jpg_128",
  },
  {
    name: "#100209",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Paid",
      quantity: 3,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_f9de629d8c97416f82b398725bd49918.jpg_128",
  },
  {
    name: "#100205",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Unpaid",
      quantity: 0,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_1782572f1dfc49d397e830918d912568.jpg_128",
  },
  {
    name: "#100200",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Unpaid",
      quantity: 10,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_03906910d07749199b09e443ce9fed6c.jpg_128",
  },
  {
    name: "#100206",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Paid",
      quantity: 11,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_9d3e5b8fc70e4d2997806ece35e7de54.jpg_128",
  },
  {
    name: "#100212",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Unpaid",
      quantity: 10,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_db24e0568cdc4a82be0a8559fb123b55.jpg_128",
  },
  {
    name: "#100211",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Unpaid",
      quantity: 2,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_085a5f9575ba4b208f6091b26cbda4c4.jpg_128",
  },
  {
    name: "#10022",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Paid",
      quantity: 8,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_82d66fece3e54a7aa10d49bda4d98259.jpg_128",
  },
  {
    name: "#10023",
    formattedPrice: "$19.99",
    inventory: {
      trackingMethod: "status",
      status: "Paid",
      quantity: 8,
    },
    mediaUrl:
      "https://static.wixstatic.com/media/84770f_c611ded729fd4461a1bb57134d4e9dd2.png_128",
  },
];

export default class BasicListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
    };
  }

  keyExtractor = (item) => item.name;

  renderRow(row, id) {
    const statusColor =
      row.inventory.status === "Paid" ? Colors.green30 : Colors.red30;
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={77.5}
          onPress={() => Alert.alert(`pressed on order #${id + 1}`)}
        >
          <ListItem.Part left>
            <Animatable.Image
              source={{ uri: row.mediaUrl }}
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
                {row.name}
              </Text>
              <Text dark10 text70 style={{ marginTop: 2 }}>
                {row.formattedPrice}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10 }}
                text90
                dark40
                numberOfLines={1}
              >{`${row.inventory.quantity} item`}</Text>
              <Text text90 color={statusColor} numberOfLines={1}>
                {row.inventory.status}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  }

  render() {
    return (
      <FlatList
        data={orders}
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
