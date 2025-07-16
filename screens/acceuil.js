import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome5, Entypo, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import MyAwesomeIcon from './../assets/madagascar.svg';


const Accueil = ({navigation}) => {
    return (
        <ScrollView style={style.container}>
            <View style={style.contenaire}>
            <View style={style.header}>    
                <TouchableOpacity style={{left: -120}}><Ionicons name="menu" color={'white'} size={40}/></TouchableOpacity>
                <Text style={style.textacceuil}>Hiteny</Text>
                <Ionicons name="help-circle-outline" size={30} color={'#fff'} style={{left: 120}}/>
            </View>
            <View style={style.maki}>
                <Image source={require('./../assets/auth-vector.png')} style={style.imageMaki}/>
                <View style={style.textMaki}>
                    <Text style={{color: 'white', fontSize: 20}}>Maki</Text>
                    <Text style={{color: 'grey', fontSize: 16}}>Continuer votre apprentissage</Text>
                </View>
            </View>
            <Text style={{color: '#fff', alignSelf: 'flex-start', marginLeft: 40, fontSize: 20}}>Progres</Text>
            <View style={style.progres}>
                <View style={style.contenairs}>
                    <Text style={{color: 'grey'}}>Lecons terminees</Text>
                    <Text style={{color: 'white'}}> 12</Text>
                </View>
                <View style={style.contenairs}>
                    <Text style={{color: 'grey'}}>Temps d'etude</Text>
                    <Text style={{color: 'white'}}>2h30min</Text>
                </View>
            </View>
            <Text style={style.pm}>Progres en Malagasy</Text>
            <View style={style.pem}>

            </View>
            <View>
                <Image source={require('./../assets/stade-barea.jpg')} style={style.imageStade} />
                <Text style={style.gasy}>Aza kivy, mbola misy andro mahery.</Text>
                <Text style={style.farantsay}>Ne te decourage pas, il y a encore d'autres jours meilleurs.</Text>
            </View>
            
            <Text style={{color:'white', alignSelf: 'flex-start', marginLeft: 40, fontSize: 20, marginBottom: 20}}>Suggestions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('lecon')} style={style.button}><Text style={style.text}>Faire une leçon</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('decouverte')} style={style.button}><Text style={style.text}>Decouvrir Madagascar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('traduction')} style={style.button}><Text style={style.text}>Faire une traduction</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('chatbot')} style={style.button}><Text style={style.text}>Aller au Cahtbot</Text></TouchableOpacity>
            <View style={style.navigation}>
                <TouchableOpacity onPress={() => navigation.navigate('accueil')}><Ionicons name="home-sharp" size={40} color={"#fff"} style={{marginLeft: 20, marginRight: 20}}/><Text style={{color: 'white', marginLeft: 20}}>Acceuil</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('lecon')}><Ionicons name="book-outline" size={40} color={"#fff"} style={{marginLeft: 20, marginRight: 20}}/><Text style={{color:'white', marginLeft: 20}}>Leçons</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('traduction')}><MaterialIcons name="translate" size={40} color={"#fff"} style={{marginLeft: 20, marginRight: 20}}/><Text style={{color: 'white', marginLeft: 20}}>Traduction</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('chatbot')}><MaterialCommunityIcons name="robot-confused-outline" size={40} color={"#fff"} style={{marginLeft: 20, marginRight: 20}}/><Text style={{color: 'white', marginLeft: 20}}>ChatBot</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('decouverte')}><Entypo name="aircraft" size={40} color={"#fff"} style={{marginLeft: 20, marginRight: 20}}/><Text style={{color: 'white', marginLeft: 20}}>Decouvrir</Text></TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    contenaire: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    textacceuil: {
        fontSize: 25,
        color: "#fff",
    },
    imageMaki: {
        width: 80,
        height: 100,
        alignSelf: 'flex-start'
    },
    maki: {
        flexDirection: 'row'
    },
    textMaki: {
        marginLeft: 50,
        justifyContent: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#282828",
        borderRadius: 10,
        marginBottom: 10,
        width: 350,
        height: 50,
    },
    text: {
        color: "#fff",
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    },
    navigation:{
        backgroundColor: '#282828',
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 20,
        padding: 20,
    },
    progres: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },
    contenairs: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        width: 150,
        height: 100,
        marginRight: 20,
        borderRadius: 20,
    },
    pm: {
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: 40,
        fontSize: 20
    },
    pem: {
        height: 200
    },
    imageStade: {
        borderRadius: 20,
        opacity: 0.5,
        width: 350,
        height: 200,
        resizeMode: 'stretch'
    },
    gasy: {
        position: 'relative',
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        top: -60
    },
    farantsay: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 15,
        top: -55
    }
})

export default Accueil;
