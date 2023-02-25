import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Bg from "../assets/backgroundStart.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";

export default function HomeScreen({ navigation }) {
  const [getToken, setGetToken] = useState(false);

  useEffect(() => {
    const navigateUser = (res, token) => {
      if ("user" in res) {
        navigation.navigate("MainMenu", {
          token: token,
          userData: res.user,
          logOut: false,
        });
      } else {
        AsyncStorage.removeItem("access_token");
      }
    };

    const validateUser = (token) => {
      const url = "https://markow.pl/API/public/api/user/me";
      fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => navigateUser(res, token));
    };

    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token != undefined) {
          validateUser(token);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);
  console.log(getToken)
  return (
    <ImageBackground source={Bg} style={{ flex: 1 }}>
      <View style={{ flex: 3, padding: 10 }}>
        <Text
          style={{
            color: "white",
            padding: 15,
            fontSize: 48,
            fontWeight: "bold",
          }}>
          PickApp
        </Text>
      </View>
      {!getToken ? (
        <>
          <View
            style={{
              flex: 8,
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 10,
            }}>
            <Text style={{ color: "white", fontSize: 36 }}>
              Reduce food waste
            </Text>
            <Text style={{ color: "white", opacity: 0.7, fontSize: 16 }}>
              Polish households waste 2 million tons of food per year, meaning
              an estimated 54 kg per Polish citizen per year.
            </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 9,
                height: 60,

                margin: 5,
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}>
              <Text
                style={{ fontSize: 20, color: "#59981A", fontWeight: "bold" }}>
                Log in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderWidth: 3,
                borderColor: "white",
                borderRadius: 9,
                height: 60,

                margin: 5,
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}>
              <Text
                style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
          <ActivityIndicator color="#3d550c" size="large" />
        </View>
      )}
    </ImageBackground>
  );
}
