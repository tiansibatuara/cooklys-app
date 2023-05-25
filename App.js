import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import useFonts from "./hooks/useFonts";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./navigation/MainNavigator/MainNavigator";
import AuthNavigator from "./navigation/AuthNavigator/AuthNavigator";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { elevation: 0 },
            cardStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={AuthNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={HomeNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
