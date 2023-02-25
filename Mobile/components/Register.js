import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bg from "../assets/backgroundStart.jpg";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fetchOngoing, setFetchOngoing] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [inCorrectEmail, setInCorrectEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [inCorrectPhone, setInCorrectPhone] = useState(false);
  const [validationOn, setValidationOn] = useState(false);

  useEffect(() => {
    if (validationOn) {
      setEmptyName(name.length > 0 ? false : true);
    }
  }, [name, validationOn]);

  useEffect(() => {
    if (validationOn) {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      setInCorrectEmail(reg.test(email) ? false : true);
    }
  }, [email, validationOn]);

  useEffect(() => {
    if (validationOn) {
      setEmptyPassword(password.length > 0 ? false : true);
    }
  }, [password, validationOn]);

  useEffect(() => {
    if (validationOn) {
      setInCorrectPhone(phone.length === 9 ? false : true);
    }
  }, [phone, validationOn]);

  const validateResponse = async (res) => {
    if ("access_token" in res) {
      try {
        await AsyncStorage.setItem("access_token", res.access_token);
        navigation.navigate("MainMenu", {
          token: res.access_token,
          userData: res.user,
        });
      } catch (e) {
        Alert.alert("Cannot store token");
      }
    } else {
      Alert.alert(res.message);
    }
  };

  const canRegister = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email) &&
      phone.length === 9 &&
      password.length > 0 &&
      name.length > 0
      ? true
      : false;
  };

  const registerUser = async () => {
    setValidationOn(true);
    if (canRegister()) {
      const data = {
        name: name,
        email: email,
        password: password,
        phone: phone,
      };
      const url = "https://markow.pl/API/public/api/register";
      setFetchOngoing(true);
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => validateResponse(res));
      setFetchOngoing(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground source={Bg} style={{ width: "100%", height: "100%" }}>
        {fetchOngoing === false ? (
          <>
            <View style={{ flex: 3, padding: 15, marginTop: 20 }}>
              <Text
                style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
                PickApp
              </Text>
            </View>
            <View
              style={{
                flex: 9,
                paddingHorizontal: 15,
                justifyContent: "flex-end",
              }}>
              <KeyboardAvoidingView behavior="padding">
                <ScrollView>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#FFFFFF",
                      flexDirection: "row",
                    }}>
                    <Image
                      style={{ width: 30, height: 30, marginRight: 15 }}
                      tintColor="rgba(255,255,255,0.7)"
                      source={require("../assets/icons/user.png")}
                    />
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      style={styles.input}
                      maxLength={50}
                      placeholder="Name"
                      placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    />
                  </View>

                  <Text style={{ color: "red" }}>
                    {emptyName ? "This value cannot be empty" : ""}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#FFFFFF",
                      flexDirection: "row",
                    }}>
                    <Image
                      style={{ width: 30, height: 30, marginRight: 15 }}
                      tintColor="rgba(255,255,255,0.7)"
                      source={require("../assets/icons/mail.png")}
                    />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      style={styles.input}
                      placeholder="Email"
                      maxLength={60}
                      placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    />
                  </View>
                  <Text style={{ color: "red" }}>
                    {inCorrectEmail ? "Incorrect email" : ""}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#FFFFFF",
                      flexDirection: "row",
                    }}>
                    <Image
                      style={{ width: 30, height: 30, marginRight: 15 }}
                      tintColor="rgba(255,255,255,0.7)"
                      source={require("../assets/icons/password.png")}
                    />
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      style={styles.input}
                      placeholder="Password"
                      maxLength={40}
                      placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                      secureTextEntry={true}
                    />
                  </View>
                  <Text style={{ color: "red" }}>
                    {emptyPassword ? "This value cannot be empty" : ""}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#FFFFFF",
                      flexDirection: "row",
                    }}>
                    <Image
                      style={{ width: 30, height: 30, marginRight: 15 }}
                      tintColor="rgba(255,255,255,0.7)"
                      source={require("../assets/icons/phone.png")}
                    />
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="Phone number"
                      maxLength={9}
                      placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    />
                  </View>
                  <Text style={{ color: "red" }}>
                    {inCorrectPhone ? "Incorrect phone number" : ""}
                  </Text>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
            <View style={{ flex: 4, paddingHorizontal: 15 }}>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 9,
                  height: 60,

                  margin: 5,
                }}
                onPress={registerUser}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#59981A",
                    fontWeight: "bold",
                  }}>
                  Create Account
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
                  navigation.navigate("Home");
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <ActivityIndicator color="#3d550c" size="large" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 2,
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
  },
});
export default Register;
