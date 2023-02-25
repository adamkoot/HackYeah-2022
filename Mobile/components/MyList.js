import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import X from "../assets/icons/X.png";

const MyList = ({ data, token }) => {
  // 1 - zajete, 0 - wolne
  // 1 true,  0 false
  const [status, setStatus] = useState(data.status == "1" ? false : true);
  const [disabled, setDisabled] = useState(false);
  const validateCategories = (categories) => {
    categories = categories.split(",");
    if (categories.length == 1) {
      let a;
      if (categories.length > 1) {
        a = require(`../assets/icons/manyCat.png`);
      } else if (categories[0] == "drinkables") {
        a = require(`../assets/icons/drinkables.png`);
      } else if (categories[0] == "bread") {
        a = require(`../assets/icons/bread.png`);
      } else if (categories[0] == "dairy") {
        a = require(`../assets/icons/dairy.png`);
      } else if (categories[0] == "grains") {
        a = require(`../assets/icons/grains.png`);
      } else if (categories[0] == "meat") {
        a = require(`../assets/icons/meat.png`);
      } else if (categories[0] == "oils") {
        a = require(`../assets/icons/oils.png`);
      } else if (categories[0] == "fruits") {
        a = require(`../assets/icons/fruits.png`);
      } else if (categories[0] == "sweets") {
        a = require(`../assets/icons/sweets.png`);
      } else if (categories[0] == "drinkables") {
        a = require(`../assets/icons/drinkables.png`);
      }
      return (
        <Image style={{ width: 50, height: 50, marginLeft: 20 }} source={a} />
      );
    } else {
      return (
        <Image
          style={{ width: 50, height: 50, marginLeft: 20 }}
          source={require("../assets/star.png")}
        />
      );
    }
  };

  const showAlert = (id) => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete announcement?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteAnnouncement(id) },
      ]
    );
  };

  const changeSwitchValue = (id) => {
    const newStatus = status ? 1 : 0;
    const url = `https://markow.pl/API/public/api/announcement/change_status/${id}/${newStatus}`;
    setStatus(!status);
    fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const deleteAnnouncement = (id) => {
    const url = `https://markow.pl/API/public/api/announcement/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setDisabled(true));
  };

  if (!disabled) {
    return (
      <View
        style={{
          display: disabled ? "none" : "initial",
          marginTop: 20,
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
          width: "100%",
          height: 68,
          borderRadius: 30,
          backgroundColor: "#ECF87F",
          paddingRight: 20,
        }}
      >
        {validateCategories(data.categories)}
        <Text style={{ marginLeft: 5, width: 80 }}>
          {data.categories.split(",").length == 1 ? data.categories : "Many"}
        </Text>
        <Text
          style={{
            color: status ? "#59981A" : "#D7263D",
            marginLeft: 15,
            fontSize: 15,
            width: 80,
            fontWeight: "bold",
          }}
        >
          {status ? "Avaible" : "Reserved"}
        </Text>
        <Switch
          trackColor={{ false: "#EAEAEA", true: "#81b0ff" }}
          thumbColor={status ? "#EAEAEA" : "#f4f3f4"}
          style={{ marginLeft: 20 }}
          onValueChange={() => {
            changeSwitchValue(data.id);
          }}
          value={status}
        />
        <TouchableOpacity
          onLongPress={() => showAlert(data.id)}
          style={{ position: "absolute", top: -10, left: 0 }}
        >
          <Image style={{ width: 30, height: 30 }} source={X} />
        </TouchableOpacity>
      </View>
    );
  }
};

export default MyList;
