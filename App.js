import React, {useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Page from './Page';
import Connexion from './Connexion';
import Accueil from './Accueil';

export default function App() {
  const Stack = createStackNavigator();
  const [token, setToken] = useState('');

  const eraseToken = async () => {
    await AsyncStorage.removeItem('token');
  };

  const getToken = async () => {
    const a = await AsyncStorage.getItem('token');
    if (a !== null) {
      setToken(a);
      nav.navigate('Accueil');
    }
  };

  const storeToken = async (value) => {
    await AsyncStorage.setItem('token', value);
    setToken(value);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Toto">
        <Stack.Screen name="Toto" component={Page} options={{ headerShown: false }} />
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          initialParams={{ eraseToken, getToken, storeToken }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          initialParams={{ eraseToken, getToken, token }} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
