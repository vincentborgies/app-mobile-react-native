
import { ImageBackground, StyleSheet, Text,View, Image} from 'react-native';
import Btn from './components/button';
import { useNavigation } from '@react-navigation/native';

export default function Page() {

  const nav = useNavigation();

  const handleClick = () => {
    nav.navigate('Connexion');
  };

  return (
  <>
  <ImageBackground source={require('./assets/backGround.png')} style={{flex: 1}} resizeMode='cover'>
      <View style={styles.container}>
      <Image source={require('./assets/lgx.png')} style={styles.logoLgx} />
      <Text style={styles.textLgx}>Inspi</Text>
      <Text style={styles.Lgx}>LGX</Text>
      </View>
      <View style={styles.viewBtn}>
        <Btn onClick={handleClick} />
      </View>
    </ImageBackground>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin:50
  },
  logoLgx: {
    resizeMode: 'stretch',
    width: 110,
    height: 120,
  },
  textLgx:{
    color: 'white',
    fontSize: 40,
  },
  Lgx:{
    color: 'white',
    fontSize: 60,
  },
  btn:{
    backgroundColor:'#f93100',
    borderRadius: 20,
    padding: 12,
  },
  viewBtn:{
    alignItems: 'center',
  },

});
