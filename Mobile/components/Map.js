import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'

const Map = (props) => {
 
 
  const [token, setToken] = useState(props.token)
  const [announcements, setAnnouncements] = useState([])
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [locationLoaded, setLocationLoaded] = useState(false)
  
  const navigation = useNavigation();
 
  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
 
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0722,
        longitudeDelta: 0.0321
      })
    }
    getCurrentLocation()
  }, [])
 
  useEffect(() => {
    const getAllAnnouncements = async () => {
      const url =
        "https://markow.pl/API/public/api/announcements";
      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((res) => setAnnouncements(res.announcements));
    };
 
    getAllAnnouncements();
    setLocationLoaded(true)
 
  }, [region]);
 
  return (
    <View style={styles.container}>
      {locationLoaded ? (
        <MapView
          style={styles.map}
          showsCompass={false}
          zoomEnabled={true}
          region={region}
        >
          {
            announcements.map((announcement) => {
                return(
                <Marker 
                  onPress={()=>{
                    console.log(announcement)
                    navigation.navigate("Details", {
                      token: token, data: announcement
                    })
                  }}
                  key={announcement.id}
                  coordinate = {{latitude: parseFloat(announcement.lat),longitude: parseFloat(announcement.lon)}}
                  pinColor = {"red"} // any color
                  title={announcement.title}
                  description={announcement.content}
                />);
            }) 
          }
        </MapView>
      ) : <ActivityIndicator color="#3d550c" size="large" />}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
 
export default Map;