
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Deco({onClick}) {
  return (
  <TouchableOpacity style={styles.btn} onPress={onClick}><Text style={{color:'white', fontSize:20}}>Se déconnecter</Text></TouchableOpacity>
)

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
      marginTop:200
    },
    viewBtn:{
      alignItems: 'center',
    },
  
  });
  
