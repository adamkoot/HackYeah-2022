import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Button, Image, TouchableOpacity, ImageEditor } from "react-native";
import ListPosition from "./ListPosition";

const List = (props) => {

  const [data, setData] = useState([]);
  const [token, setToken] = useState(props.token);
  const [chosenCat, setChosenCat] = useState("all");
  const [countSelected, setCountSelected] = useState(0)
  const [catToDelete, setCatToDelete] = useState("all")

  useEffect(() => {
    // Update the document title using the browser APIhttps://markow.pl/API/public

    const getAllAnnouncements = async () => {
      const url =
        "https://markow.pl/API/public/api/announcements";
      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.announcements));
    };


    getAllAnnouncements();
  }, []);


  useEffect(() => {
    console.log(countSelected)
  }, [countSelected])

  const renderFiltredData = () => {
    if (chosenCat == "all") {
      console.log(data)
      return (
        data.map((item, index) => {
          return (
            <View style={styles.position} key={item.id}>
              <ListPosition item={item} token={token} />
            </View>
          )
        })
      )
    } else {
      return (
        data.filter((item) => item.categories.includes(chosenCat)).map((item, index) => {
          return (
            <View style={styles.position} key={item.id}>
              <ListPosition item={item} token={token} />
            </View>
          )
        })
      )
    }

  }
  const changeCount = (value) => {
    let change = countSelected + value
    setCountSelected(change)
  }

  const categories = ["bread", "dairy", "grains", "meat", "oils", "drinkables", "fruits", "sweets", "many", "other"]

  const getPhoto = (arr) => {
    let a;
    if (arr == "drinkables") {
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
    } else if (arr == "other") {
      a = require(`../assets/icons/otherCat.png`)
    } else if (arr == "many") {
      a = require(`../assets/icons/manyCat.png`)
    }
    return (<Image tintColor={chosenCat!=arr?"#0B132B":"#c1c78d"} source={a} style={[styles.image_item,{ tintColor: chosenCat!=arr?"#0B132B":"#c1c78d"}]} />)
  }

  changeCategory = (value) => {
    if (chosenCat == value) {
      setChosenCat("all")
    } else (
      setChosenCat(value)
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.text}>Categories:</Text>
        <ScrollView horizontal={true}>


          {categories.map((item, index) => {
            console.log(chosenCat != item ? console.log("chuj") : console.log("cipa"))
            return (
              <View key={index} style={styles.containter_item}>
                <TouchableOpacity onPress={() => { changeCategory(item) }} >
                  {getPhoto(item)}
                  <Text style={styles.text_item}>{item}</Text>
                </TouchableOpacity>
              </View>
            )
          })}

        </ScrollView>

      </View>
      <View style={styles.container}>
        <Text style={styles.text}>List:</Text>
        <ScrollView>
          {renderFiltredData()}

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  imageBig: {
    marginTop: 10,
    width: 35,
    height: 35,
  },
  header: {
    marginTop: 40,
    flex: 1.2,
  },
  container: {
    flex: 5,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  categories: {
    margin: 10,
  },
  position: {
    padding: 10,
  },
  image_item: {
    width: 64,
    height: 64,
  },
  text_item: {
    textAlign: "center",
  },
  containter_item: {
    margin: 5,
    borderWidth: 1,
    borderColor:"transparent",
    height: 90
  }
});

export default List;
