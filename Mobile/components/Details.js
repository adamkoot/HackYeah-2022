import React, { useEffect, useState } from "react";
import Bg from "../assets/group4.png";

import {
  ImageBackground,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
const Details = ({ route }) => {
  const token = route.params.token;

  const item = route.params.data;

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(item.status);

  useEffect(() => {
    console.log(item)
    const getUserInfo = async () => {
      const url =
        "https://markow.pl/API/public/api/user/details/" +
        route.params.data.user_id;
      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.user));
    };

    getUserInfo();
  }, []);

  let a;
  let arr = item.categories.split(",");

  if (arr.length > 1) {
    a = require(`../assets/icons/manyCat.png`);
  } else if (arr == "bread") {
    a = require(`../assets/icons/bread.png`);
  } else if (arr == "dairy") {
    a = require(`../assets/icons/dairy.png`);
  } else if (arr == "grains") {
    a = require(`../assets/icons/grains.png`);
  } else if (arr == "meat") {
    a = require(`../assets/icons/meat.png`);
  } else if (arr == "oils") {
    a = require(`../assets/icons/oils.png`);
  } else if (arr == "fruits") {
    a = require(`../assets/icons/fruits.png`);
  } else if (arr == "sweets") {
    a = require(`../assets/icons/sweets.png`);
  } else if (arr == "drinkables") {
    a = require(`../assets/icons/drinkables.png`);
  }

  const changeColor = () => {
    setStatus(!status);
  };
  const changeStatus = async (status) => {
    item.status = item.status == "0" ? "1" : "0";
    const url = `https://markow.pl/API/public/api/announcement/change_status/${item.id}/${item.status}`;
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res), changeColor());
  };
  return (
    <ImageBackground source={Bg} style={{ width: "100%", height: "100%" }}>
      <View style={styles.header}>
        <View
          style={{ backgroundColor: "white", borderRadius: 90, padding: 20 }}>
          <Image source={a} />
        </View>
        <Text style={styles.topTitle}>{item.title}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.block}>
          <Text style={styles.title}>About/Instructions:</Text>
          <Text>{item.content}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.title}>Addres:</Text>
          <Text>{item.address}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.title}>Owner:</Text>
          <Text>{data.name}</Text>
          <Text>{data.email}</Text>
          <Text>{data.phone}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={changeStatus} style={styles.btn}>
            <Text style={status ? styles.textClose : styles.textOpen}>
              Reserve
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>{
            Linking.openURL("http://play.google.com/store/apps/details?id=com.glovo")
          }}>
            <Text style={{color: "orange"}}>
              Delivery by Glovo!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  content: {
    flex: 2,
    justifyContent: "center",
  },
  available: {
    color: "green",
  },
  unavailable: {
    color: "red",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop:2
  },
  textOpen: {
    color: "green",
  },
  textClose: {
    color: "red",
  },
  button: {
    marginTop:20,
    marginLeft:40,
    width: "80%",
  },
  block: {
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  topTitle: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginTop: 15,
  },
});

export default Details;
