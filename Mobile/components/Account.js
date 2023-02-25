import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

const Account = (props) => {
    const [token, setToken] = useState(props.token)
    const [name, setName] = useState(props.userData.name);
    const [email, setEmail] = useState(props.userData.email);
    const [phone, setPhone] = useState(props.userData.phone);
    const [id, setId] = useState(props.userData.id);

    const navigation = useNavigation();

    const showToast = (message, color) => {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            backgroundColor: color,
            position: Toast.positions.CENTER,
            textColor: "#fff"
        })
    }

    const editUser = async () => {
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            };
        };

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(email)) {
            showToast("Invalid email", "#D7263D")
            return;
        }
        else if (name.length == 0) {
            showToast("Name value has to be entered", "#D7263D")
            return;
        }

        const data = {
            name: name,
            email: email,
            phone: phone,
            id: id
        };
        const url = "https://markow.pl/API/public/api/user/edit";
        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + token,
            },
            body: JSON.stringify(data, getCircularReplacer())
        })
            .then((res) => res.json())
            .then((res) => showToast(res.message, "#3d550c"));
    }

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem("access_token");
            navigation.navigate('Home')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}>
            <View
                style={{
                    width: "100%",
                    flex: 1,
                    paddingHorizontal: 15,
                    fontWeight: "bold",
                    marginTop: 30,
                }}>
                <Text style={{ color: "black", fontSize: 36, fontWeight: "bold" }}>
                    Welcome, user!
                </Text>
            </View>
            <View
                style={{
                    flex: 4,
                    paddingHorizontal: 15,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: 15,
                    width: "100%",
                }}>
                <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
                    <ScrollView>
                        <Text>Email:</Text>
                        <TextInput value={email} onChangeText={setEmail} style={styles.input} />

                        <Text>Name:</Text>
                        <TextInput value={name} onChangeText={setName} style={styles.input} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <View style={{ flex: 3, width: "100%", padding: 15, alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={editUser}>Save changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logOut}>
                    <Text style={styles.buttonLogOutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    formContainer: {
        flex: 3,
        flexDirection: "column",
        padding: 15,
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: "column",
        padding: 15,
        justifyContent: "flex-end",
    },
    titleBox: {
        flex: 1,
        justifyContent: "center",
    },
    inputBox: {
        flex: 1,
    },
    input: {
        width: "100%",
        padding: 5,
        backgroundColor: "#f8f8f8",
        height: 40,
        marginTop: 5,
        borderRadius: 9,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    title: {
        fontSize: 32,
    },
    button: {
        paddingHorizontal: 10,

        margin: 5,
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
        backgroundColor: "#fff",
        borderRadius: 9,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    buttonText: {
        color: "#0B132B",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonLogOutText: {
        color: "#D7263D",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Account;
