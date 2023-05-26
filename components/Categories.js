import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import categoryList from "../data/categoryList";

const Categories = () => {
  const navigation = useNavigation();

  const handlePress = (category) => {
    console.log(category);
    navigation.navigate("Category", { category });
  };

  console.log(categoryList.image);
  return (
    <View>
      <Text style={styles.title}>Categories</Text>

      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categoryList.map((categoryMap, index) => {
          return (
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                pressed && styles.pressedStyle,
              ]}
              key={index}
              onPress={() => handlePress(categoryMap.category)}
            >
              <Image source={categoryMap.uri} style={styles.image} />
              <Text style={styles.label}>{categoryMap.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontFamily: "psbold",
    fontSize: 20,
  },
  scrollView: {
    marginTop: 8,
  },
  pressable: {
    flex: 1,
    margin: 6,
    width: 100,
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    borderRadius: 100,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressedStyle: {
    opacity: 0.6,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    // backgroundColor: "black",
    tintColor: "black",
  },
  label: {
    textAlign: "center",
    marginTop: 12,
    fontFamily: "psbold",
    fontSize: 14,
    color: "#67666D",
  },
});
