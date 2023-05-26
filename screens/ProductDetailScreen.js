import React, { useState, useEffect } from "react";
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
// import recipes from "../data/Recipes";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { Ionicons } from "@expo/vector-icons";
import { decrementQty, incrementQty } from "../ProductReducer";
import { auth, db } from "../config";
import {
  doc,
  collection,
  onSnapshot,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;
  console.log(recipe.isFavorite);

  const [documentId, setDocumentId] = useState(null); // State to store the document ID

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        querySnapshot.forEach((doc) => {
          const recipeData = doc.data();
          if (recipeData.id === recipe.id) {
            setDocumentId(doc.id);
          }
        });
      } catch (error) {
        console.log("Error fetching recipes:", error);
      }
    };

    fetchRecipe();
  }, [recipe]);

  // ...

  // const toggleFavorite = async () => {
  //   try {
  //     const docRef = doc(db, "recipes", documentId);
  //     await updateDoc(docRef, { favorite: !isFavorite });
  //     setIsFavorite(!isFavorite);
  //   } catch (error) {
  //     console.log("Error updating favorite status:", error);
  //   }
  // };

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

  // const toggleFavorite = () => {
  //   const updatedRecipe = {
  //     ...recipe,
  //     favorite: !isFavorite,
  //   };
  //   setIsFavorite(!isFavorite);
  //   // Update the recipe in the recipes array if needed
  //   const updatedRecipes = recipes.map((r) =>
  //     r.id === updatedRecipe.id ? updatedRecipe : r
  //   );
  //   // Update the recipes array in your data source or state management

  //   console.log("Updated Recipes:", updatedRecipes);
  // };

  // const toggleFavorite = () => {
  //   const recipeDocRef = doc(db, 'recipes', recipe.id);
  //   const newFavoriteStatus = !isFavorite;
  //   setIsFavorite(newFavoriteStatus);

  //   // Update the favorite status in Firestore
  //   updateDoc(recipeDocRef, { favorite: newFavoriteStatus })
  //     .then(() => {
  //       console.log('Favorite status updated successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error updating favorite status:', error);
  //     });
  //   };
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
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.namePriceContainer}>
          <Text style={styles.detailName}>{recipe.name}</Text>
          <Text style={styles.foodPrice}>{formatter.format(recipe.price)}</Text>
        </View>
        <View style={styles.descTitle}>
          <Text style={styles.descName}>Alat dan Bahan</Text>
          <Text>{recipe.materials}</Text>
        </View>
        <View style={styles.descTitle}>
          <Text style={styles.descName}>Tutorial</Text>
          <Text>{recipe.desc}</Text>
        </View>
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
              marginLeft: 12,
              flexDirection: "row",
              backgroundColor: "black",
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
              <Text style={styles.textSymbol}>-</Text>
            </Pressable>

            <Text style={styles.textNumber}>
              {product.find((item) => item.id === `${recipe.id}`).quantity}
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
              marginLeft: 12,
              flexDirection: "row",
              backgroundColor: "black",
              gap: 10,
              borderRadius: 13,
            }}
          >
            <Pressable onPress={addItemToCart} style={styles.quantityHandler}>
              <Text style={styles.textSymbol}></Text>
            </Pressable>

            <Pressable onPress={addItemToCart}>
              <Text style={styles.textNumber}>ADD TO CART</Text>
            </Pressable>

            <Pressable
              onPress={addItemToCart}
              // onPress={incrementQuantityHandler}
              style={styles.quantityHandler}
            >
              <Text style={styles.textSymbol}></Text>
            </Pressable>
          </Pressable>
        )}

        <Text style={styles.foodPriceTotal}>
          {formatter.format(
            product.find((item) => item.id === `${recipe.id}`).quantity *
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
  namePriceContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginVertical: 4,
  },
  detailName: {
    fontSize: 28,
    fontFamily: "psbold",
    // backgroundColor: "red",
  },
  descTitle: {
    marginTop: 12,
    alignContent: "center",
    marginVertical: 4,
  },
  descName: {
    fontSize: 20,
    fontFamily: "psbold",
    // backgroundColor: "red",
  },
  foodPrice: {
    paddingTop: 6,
    fontFamily: "psregular",
    fontSize: 18,
    alignItems: "center",
    // backgroundColor: "red"
  },
  foodPriceTotal: {
    paddingTop: 6,
    fontFamily: "psregular",
    fontSize: 18,
    alignItems: "center",
    marginRight: 12,
    // backgroundColor: "red"
  },
  quantityHandler: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignContent: "center",
  },
  textSymbol: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 6,
    textAlign: "center",
  },
  textNumber: {
    fontSize: 16,
    color: "white",
    padding: 8,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
