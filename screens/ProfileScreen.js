import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const myUserUid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const docRef = doc(db, 'users', myUserUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        } else {
          console.log('User document not found');
        }
      } catch (error) {
        console.log('Error fetching user document:', error);
      }
    };

    if (myUserUid) {
      fetchUserName();
    }
  }, [myUserUid]);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Auth');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.greetingText}>Hi, {userName}!</Text>
          <Text style={styles.subText}>Ready to cook today?</Text>
        </View>

        <Pressable onPress={signOutUser} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  signOutButton: {
    marginTop: 16,
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;
