import * as React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './components/HomeScreen';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();


function App() {

  return (
    <RootSiblingParent>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name='MainMenu' component={MainMenu} />

        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

export default App;