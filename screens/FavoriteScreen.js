import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const FavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Coming Soon {"<3"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "psbold",
    fontSize: 24,
  },
});
