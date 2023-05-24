import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";

const Categories = () => {
  const categories = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Appetizer",
    },
    {
      id: "1",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Main\nCourse",
    },
    {
      id: "2",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Dessert",
    },
    {
      id: "3",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Vegan",
    },
    {
      id: "4",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Michellin\nStar",
    },
  ];

  return (
    <View>
      <Text style={{ fontFamily: "psbold", fontSize: 20 }}>Categories</Text>

      <ScrollView
        style={{ marginTop: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <Pressable
            style={{
              flex: 1,
              margin: 6,
              width: 100,
              borderWidth: 0.8,
              borderColor: "#C0C0C0",
              borderRadius: 100,
              padding: 12,
              alignItems: "center",
            }}
            key={index}
          >
            <Image
              source={{ uri: category.image }}
              style={{ width: 68, height: 68 }}
            />
            <Text
              style={{
                textAlign: "center",
                marginTop: 12,
                fontFamily: "psbold",
                fontSize: 14,
                color: "#67666D",
              }}
            >
              {" "}
              {category.name}{" "}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
