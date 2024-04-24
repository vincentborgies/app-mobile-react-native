import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Deco from './components/deco';

export default function Accueil({ route }) {
    const nav = useNavigation();
    const [datas, setDatas] = useState([])

    const { eraseToken, getToken, token } = route.params;

    useEffect(() => {
        getToken();
    }, []);

    const deconnexion = () => {
        eraseToken();
        nav.navigate('Connexion');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://lgxmotivation.lgx-france.fr/profil', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`, 
                        'Content-type': 'application/json',
                    }
                });

                if (!res.ok) {
                    throw new Error('Impossible de récupérer le profil');
                }

                const data = await res.json();
                setDatas(data)

            } catch (error) {
                console.log('Error: ' + error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <ImageBackground source={require('./assets/image.png')} style={{ flex: 1 }} resizeMode='cover'>
            <View style={styles.container}>
                <Text style={styles.textLgx}>Bonne journée</Text>
                <Text style={styles.textLgx}>{`${datas.nom}`}</Text>
                <Text style={styles.textLgx}>{`${datas.email}`}</Text>
                <Text style={styles.textLgx}>{`${datas.id}`}</Text>
                <Deco onClick={deconnexion} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
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
        margin: 10

    }

});
