import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const LandingScreen = () => {

    const navigation = useNavigation()

    const handleLoginPress = () => {
        navigation.navigate("Login");
      };
      const handleSignUpPress = () => {
        navigation.navigate("Register");
      };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image source={require('../assets/lastbg.png')} style={{width:320, height:520, resizeMode:'contain'}}/>
            {/* <Image source={require('../../assets/artt.png')} style={{width:300,height:400}}/> */}
            {/* <View style={styles.imageContainer}>
            </View> */}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLoginPress}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUpPress}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#febf55', // Set background color to blue
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#4169E1',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#4169E1',
        fontWeight: '700',
        fontSize: 16,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: "red"
    },
})
