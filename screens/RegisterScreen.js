import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // const register = () => {
  //   if (name === "" || email === "" || password === "") {
  //     Alert.alert('Invalid details', 'Please fill all the details', [
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ]);
  //   }
  //   handleSignUp;
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const myUserUid = user.uid;
        const email = user.email;
        console.log("Registered with:", user.email);
        console.log("UID: ", user.uid);
        console.log("User Credential: ", userCredentials);

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: email,
          name: name,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.backButton}>
        <MaterialIcons
          onPress={() => navigation.goBack()}
          name="arrow-back-ios"
          size={24}
          color="black"
          suppressHighlighting={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={() => {
            this.secondTextInput.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            this.secondTextInput = input;
          }}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => {
            this.thirdTextInput.focus();
          }}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          ref={(input) => {
            this.thirdTextInput = input;
          }}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={handleSignUp}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={() => navigation.replace("Login")}
        style={{ marginTop: 20 }}
      >
        <Text>Already have an account? Sign In!</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#febf55", // Set background color to blue
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#4169E1",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#4169E1",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 12,
    zIndex: 1,
  },
});
