import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
// import recipes from "../data/Recipes";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { collection, getDocs } from "firebase/firestore";


const Popular = () => {
  const navigation = useNavigation();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => { 
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipesData = querySnapshot.docs.map((doc) => doc.data());
        setRecipes(recipesData);
        console.log(recipesData)
      } catch (error) {
        console.log("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

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

  const dispatch = useDispatch();

  recipes.map((recipe) => dispatch(getProducts(recipe)));

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
