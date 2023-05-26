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
  SafeAreaView,
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
        const userEmail = user.email;
        console.log("Registered with:", user.email);
        console.log("UID: ", user.uid);
        console.log("User Credential: ", userCredentials);

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: userEmail,
          name: name,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="black"
            suppressHighlighting={true}
          />
          <View>
            <Text style={styles.titleText}>Register</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
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
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <Pressable
              onPress={() => navigation.replace("Login")}
              style={styles.pressable}
            >
              <Text style={styles.pressableText}>
                Already have an account? Sign In!
              </Text>
            </Pressable>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#febf55",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  topBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8, // PENTING SAMAIN
    backgroundColor: "transparent",
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
    paddingBottom: 12,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    marginTop: 20,
  },
  pressableText: {
    fontSize: 16,
  },
});

export default RegisterScreen;
