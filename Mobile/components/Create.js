import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import Bg from "../assets/backgroundStart.jpg";
import { useNavigation } from "@react-navigation/native";

const Create = (props) => {
  const navigation = useNavigation();
  const [token, setToken] = useState(props.token);
  const [selectedCat, setSelectedCat] = useState("drinkables");

  const K_OPTIONS = [
    {
      name: "Drinkables",
      id: "drinkables",
    },
    {
      name: "Bread",
      id: "bread",
    },
    {
      name: "Dairy",
      id: "dairy",
    },
    {
      name: "Grains",
      id: "grains",
    },
    {
      name: "Meat",
      id: "meat",
    },
    {
      name: "Oils",
      id: "oils",
    },
    {
      name: "Fruits",
      id: "fruits",
    },
    {
      name: "Sweets",
      id: "sweets",
    },
    {
      name: "Other",
      id: "other",
    },
    {
      name: "Many",
      id: "many",
    },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [content, setContent] = useState("");


  useEffect(() => {
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
  
        let l = await Location.getCurrentPositionAsync({});
     
      setLat(l.coords.latitude);
      setLon(l.coords.longitude);

      console.log(lat)
    };
    getCurrentLocation()
  }, []);

  const createAnnouncement = () => {
    

    //console.log(token);

    const data = {
      title: title,
      description: description,
      address: address,
      status: 0,
      available_now: 0,
      lat: lat,
      lon: lon,
      categories: selectedCat,
      content:content
    };

    console.log(data);

    
        const url = "https://markow.pl/API/public/api/announcement";
         fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => navigation.navigate('My'));

          
      };
    
   

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground source={Bg} style={{ width: "100%", height: "100%" }}>
        <>
          <View style={{ flex: 20, padding: 10, justifyContent: "center" }}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholder="Title"
              maxLength={255}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            />
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              placeholder="Description"
              maxLength={1000}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            />

            <TextInput
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              placeholder="Address"
              maxLength={255}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              
            />
            <TextInput
              value={content}
              onChangeText={setContent}
              style={styles.input}
              placeholder="Content"
              maxLength={255}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              
            />
            <Picker
              style={{ color: "white", padding: 30 }}
              dropdownIconColor={"white"}
              selectedValue={selectedCat}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCat(itemValue)
              }
            >
              {K_OPTIONS.map((item) => {
                return (
                  <Picker.Item
                    style={{fontSize:20, fontWeight: "bold"}}
                    label={item.name}
                    value={item.id}
                    key={item.id}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={{ flex: 8, padding: 10, justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderWidth: 3,
                borderColor: "white",
                borderRadius: 9,
                height: 60,
                padding: 10,
                margin: 5,
              }}
              onPress={createAnnouncement}
            >
              <Text
                style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}
              >
                Create
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
                padding: 10,
                margin: 5,
              }}
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <Text
                style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 2,
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
  },
  MainContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: "white",
  },

  text: {
    padding: 12,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  pickerItems: {
    height: 88,
    color: 'red'
  },
});
export default Create;
