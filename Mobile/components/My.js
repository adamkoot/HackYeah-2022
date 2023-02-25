import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import MyList from './MyList';
import Bg from "../assets/backgroundStart.jpg";
const My = ( props ) => {
    // announcement/me

    const [renderData, setRenderData] = useState([])
    const [fetchOnGoing, setFetchonGoing] = useState(true)

    useEffect(()=> {

        const url = "https://markow.pl/API/public/api/announcements/my"
        fetch(url, {
            headers: {
                Authorization: "Bearer " + props.token,
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => setRenderData(res.announcements))

        setFetchonGoing(false)
    }, [])

    return (
        <ImageBackground style={{ width: "100%", height: "100%" }} source={Bg}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 50, color: "black", fontWeight:'bold' }}>My Offer:</Text>

            <ScrollView style={{ marginTop: 15 }}>

                {fetchOnGoing ? (
                    <ActivityIndicator style={{ marginTop: 150 }} color="#3d550c" size="large" />
                ) : (<View style={{ paddingLeft: 30, paddingRight: 30 }}>
                    {renderData.length > 0 ? (
                        renderData.map((item, index) => (
                            <MyList token={props.token} key={index} data={item} />
                        ))

                    ) : (<Text>There is nothing here</Text>)}
                </View>)}
                
            </ScrollView>

        </ImageBackground>
    );
}


export default My;