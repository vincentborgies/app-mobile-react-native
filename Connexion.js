import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function Connexion({route}) {
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');


  const {eraseToken, getToken, storeToken} = route.params;

  useEffect(() => {
    getToken();
  }, []);


  const onChangePassword = (text) => {
    setPassword(text);
    setErreur('')
  };

  const onChangeEmail = (text) => {
    setEmail(text);
    setErreur('')
  };

  const login = async () => {
    try {
      const res = await fetch('https://lgxmotivation.lgx-france.fr/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await res.json();

      if(data.erreur){
        setErreur(data.erreur)
      }else{
        console.log(data)
        eraseToken()
        storeToken(data.token);
        nav.navigate('Accueil');
      }
      
    } catch (error) {
      console.log('Error: ' + error.message);
    }
  };

  const [loaded] = useFonts({
    "Pacifico-Regular": require('./assets/fonts/Pacifico-Regular.ttf'),
  });
  if(!loaded){
    return <Text>chargement du font</Text>
  }

  return (
    <ImageBackground source={require('./assets/backGround.png')} style={{ flex: 1 }} resizeMode='cover'>
      <View style={styles.container}>
        <Text style={styles.textLgx}>Connexion</Text>
      </View>
      <View style={{ margin: 20 }}>
        <TextInput style={styles.input} placeholder="email" keyboardType="email-address" autoCapitalize='none' onChangeText={onChangeEmail} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          autoCapitalize='none'
          secureTextEntry={true} // Pour masquer le texte entré (comme un mot de passe)
          onChangeText={onChangePassword}
        />
        <Text style={{ color: 'red' }}>{erreur && erreur}</Text>
      </View>
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    fontFamily:"Pacifico-Regular"
  },
  textLgx: {
    color: 'white',
    fontSize: 40,

  },
  Lgx: {
    color: 'white',
    fontSize: 60,
  },
  btn: {
    backgroundColor: '#f93100',
    borderRadius: 20,
    padding: 12,
  },
  viewBtn: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    margin: 10,
  },
});
