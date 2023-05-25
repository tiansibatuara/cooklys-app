import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import recipes from "../data/Recipes";
import { useNavigation } from "@react-navigation/native";
// import { db } from "../config";
import { useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";

const Popular = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();

  const renderRecipeItem = ({ item }) => {
    const handleCardPress = () => {
      navigation.navigate("ProductDetail", { recipe: item });
    };

    return (
      <View style={styles.recipeItem}>
        <Pressable
          onPress={handleCardPress}
          key={item.id}
          style={styles.itemCard}
        >
          <Image source={{ uri: item.image }} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{item.name}</Text>
        </Pressable>
      </View>
    );
  };

  const product = useSelector((state) => state.product.product);
    console.log("Product array", product);

    // useEffect(() => {
    //   if (product.length > 0) return;
  
    //   const fetchProducts = async () => {
    //     const colRef = recipes(db, "types");
    //     const docsSnap = await getDocs(colRef);
    //     docsSnap.forEach((doc) => {
    //       items.push(doc.data());
    //     });
    //     items?.map((service) => dispatch(getProducts(service)));
    //   };
    //   fetchProducts();
    // }, []);

  return (
    <View>
      <Text style={styles.title}>Popular Recipes</Text>
      <View style={{ paddingHorizontal: 0 }}>
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.recipeList}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "psbold",
    fontSize: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  recipeItem: {
    flexBasis: "auto",
    padding: 8,
    width: "50%",
  },
  itemCard: {
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    borderRadius: 30,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 8,
    alignItems: "center",
  },
  recipeImage: {
    width: "100%",
    borderRadius: 30,
    height: 160,
  },
  recipeName: {
    textAlign: "center",
    marginTop: 12,
    fontFamily: "psbold",
    fontSize: 14,
    color: "#67666D",
  },
});

export default Popular;
