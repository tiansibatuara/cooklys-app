import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { auth } from '../config'
import {signOut} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'


const ProfileScreen = () => {
  const navigation = useNavigation();

  const user = auth.currentUser
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Auth")
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>

    <Pressable onPress={signOutUser}>
      <Text>Sign Out</Text>
    </Pressable>

    </View>

  )
}

export default ProfileScreen

const styles = StyleSheet.create({})