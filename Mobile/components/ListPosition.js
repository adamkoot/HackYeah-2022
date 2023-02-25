import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { getDistance } from "geolib";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const ListPosition = (props) => {
  const navigation = useNavigation();
 
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let l = await Location.getCurrentPositionAsync({});

      let dis = getDistance(
        {
          latitude: parseFloat(props.item.lat),
          longitude: parseFloat(props.item.lon),
        },
        { latitude: l.coords.latitude, longitude: l.coords.longitude }
      );

      setDist(dis / 1000);
    };
    getCurrentLocation();
    
  }, []);
  // const a = require(`../assets/eggs.png`)

  let a;
  let arr = props.item.categories.split(",");

  if (arr.length > 1) {
    a = require(`../assets/icons/manyCat.png`);
  } else if (arr == "drinkables") {
    a = require(`../assets/icons/drinkables.png`);
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
  } else if (arr == "others") {
    a = require(`../assets/icons/otherCat.png`);
  }


  return (
    <TouchableOpacity
      style={styles.containter}
      onPress={() => {
        navigation.navigate("Details", {
          data: props.item,
          token: props.token,
        });
      }}
    >
      <Image source={a} style={styles.image} />

      <View>
        <Text style={[{ fontWeight: "bold" }, { fontSize: 16 }]}>
          {props.item.title}
        </Text>
      </View>


      <View style={styles.distance}>
        <Text style={{color:'green'}}>{dist.toFixed(2)} KM</Text>
        <Text style={{color:'green'}}>away</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
  },
  star: {
    width: 28,
    height: 28,
  },
  text: {
    textAlign: "center",
  },
  containter: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    height: "100%",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ECF87F",
    borderRadius: 60,
  },
  distance: {
    alignItems: "center",
  },
});

export default ListPosition;
