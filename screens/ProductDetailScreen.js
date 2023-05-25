import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import recipes from "../data/Recipes";

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(recipe.favorite);

  const toggleFavorite = () => {
    const updatedRecipe = {
      ...recipe,
      favorite: !isFavorite,
    };
    setIsFavorite(!isFavorite);
    // Update the recipe in the recipes array if needed
    const updatedRecipes = recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    // Update the recipes array in your data source or state management

    console.log("Updated Recipes:", updatedRecipes);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          onPress={() => navigation.goBack()}
          name="arrow-back-ios"
          size={24}
          color="black"
          suppressHighlighting={true}
        />
        <TouchableOpacity onPress={toggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="black"
            suppressHighlighting= {true}
          />
          <TouchableOpacity onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View> */}
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <Text style={styles.detailName}>{recipe.name}</Text>
      </ScrollView>
      <Pressable
        style={{
          position: "absolute",
          marginBottom: 20,
          bottom: 20,
          left: "40%",
        }}
      >
        <Text
          style={{
            borderColor: "gray",
            borderRadius: 8,
            borderWidth: 0.8,
            color: "#088F8F",
            textAlign: "center",
            padding: 5,
            fontFamily: "psbold",
          }}
        >
          ADD TO CART
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
  header: {
    padding: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 20,
    height: 20,
  },
  recipeImage: {
    width: "100%",
    borderRadius: 20,
    height: 200,
  },
  detailName: {
    fontSize: 28,
    fontFamily: "psbold",
    marginTop: 12,
  },
});

export default ProductDetailScreen;
