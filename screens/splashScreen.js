import React, {useRef, useEffect} from "react";
import { StyleSheet, Image, View, Animated, Easing } from "react-native";

export default function SplashScreen(){
    const redSquareX = useRef(new Animated.Value(-200)).current;
    const greenSquareX = useRef(new Animated.Value(200)).current;
    const whiteSquareX = useRef(new Animated.Value(-200)).current;
    const lemurienSquare = useRef(new Animated.Value(-450)).current;
    const TextSquare = useRef(new Animated.Value(-280)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(redSquareX, {
                    toValue: 0,
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(greenSquareX, {
                    toValue: 0,
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(whiteSquareX, {
                    toValue: 0,
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                })
            ]),
            Animated.timing(lemurienSquare, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }),
            Animated.timing(TextSquare, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }),
        ]).start()
    }, []);
    return(
        <View style={styles.container}>
            <Animated.View style={[styles.square, styles.red, {transform: [{translateX: redSquareX}] }] } />
            <Animated.View style={[styles.square, styles.green, {transform: [{translateX: greenSquareX}] }] } />
            <Animated.View style={[styles.square, styles.white, {transform: [{translateX: whiteSquareX}] }] } />
            <Animated.Image source={require('./../assets/lemurien.png')} style={[styles.lemurien, {transform: [{translateY: lemurienSquare}] }] } resizeMode= "contain" />
            <Animated.Text style={[styles.text, {transform: [{translateX: TextSquare}] }] }>HITENY</Animated.Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "beige"
    },
    square: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 10,
    },
    red: {
        backgroundColor: "#DA4726",
        left: 20,
        top: 420
    },
    green: {
        backgroundColor: "#375A32",
        right: 52,
        top: 398
    },
    white: {
        backgroundColor: "white",
        left: 20,
        top: 220
    },
    lemurien: {
        width: 450,
        height: 450,
        position: "absolute",
        top: 200
    }, 
    text: {
        color: "#375A32",
        position: 'absolute',
        textAlign: 'center',
        top: 650,
        fontSize: 50,
        fontWeight: 'bold',
    }
});