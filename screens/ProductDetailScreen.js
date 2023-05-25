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
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { Ionicons } from "@expo/vector-icons";
import { decrementQty, incrementQty } from "../ProductReducer";




const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;
  console.log("recipe", recipe.id);
  const [isFavorite, setIsFavorite] = useState(recipe.favorite);
  const product = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(recipe)); // cart
    dispatch(incrementQty(recipe)); // product
  };

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  const handleCart = () => {
    navigation.navigate("Cart");
  };

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
        <Ionicons
          onPress={() => navigation.goBack()}
          name="ios-chevron-back"
          size={32}
          // backgroundColor={"red"}
          color="black"
          suppressHighlighting={true}
        />
          <Ionicons
            onPress={handleCart}
            name="ios-cart-outline"
            size={32}
            color="black"
            // backgroundColor={"red"}
            suppressHighlighting={true}
          />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <Text style={styles.detailName}>{recipe.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        {cart.some((c) => c.id === recipe.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              gap: 10,
              borderRadius: 13,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(recipe)); // cart
                dispatch(decrementQty(recipe)); // product
              }}
              // onPress={decrementQuantityHandler}
              style={styles.quantityHandler}
            >
              <Text
                style={styles.textSymbol}
              >
                -
              </Text>
            </Pressable>

            <Text
              style={styles.textNumber}
            >
              {product.find((item) => item.id === `${recipe.id}`).quantity }
            </Text>

            <Pressable
              onPress={() => {
                console.log(recipe);
                dispatch(incrementQuantity(recipe)); // cart
                dispatch(incrementQty(recipe)); //product
              }}
              // onPress={incrementQuantityHandler}
              style={styles.quantityHandler}
            >
              <Text style={styles.textSymbol}>+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              gap: 10,
              borderRadius: 13,
            }}
          >
            <Pressable
              // onPress={decrementQuantityHandler}
              style={styles.quantityHandler}
            >
              <Text style={styles.textSymbol}>-</Text>
            </Pressable>

            <Text
              style={styles.textNumber}
            >
              {product.find((item) => item.id === `${recipe.id}`).quantity}
            </Text>

            <Pressable
              onPress={addItemToCart}
              // onPress={incrementQuantityHandler}
              style={styles.quantityHandler}
            >
              <Text
                style={styles.textSymbol}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        )}

        <Text style={styles.foodPrice}>
          {formatter.format(
            (product.find((item) => item.id === `${recipe.id}`).quantity) *
              product.find((item) => item.id === `${recipe.id}`).price
          )}
        </Text>
      </View>
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
  quantityHandler: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignContent: "center",
  },
  textSymbol: {
    fontSize: 16,
    color: "#088F8F",
    paddingHorizontal: 6,
    textAlign: "center",
  },
  textNumber :{
    fontSize: 16,
    color: "#088F8F",
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
