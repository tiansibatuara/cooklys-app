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
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
// import recipes from "../data/Recipes";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { decrementQty, incrementQty } from "../ProductReducer";
import { auth, db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getProducts } from "../ProductReducer";

const Category = () => {
  const route = useRoute();
  const { category } = route.params;

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // const querySnapshot = await getDocs(collection(db, "recipes"));
        console.log("testkirim", category)
        const querySnapshot = await getDocs(
          query(collection(db, "recipes"), where("category", "==", category))
        );
        const recipesData = querySnapshot.docs.map((doc) => doc.data());
        setRecipes(recipesData);
        console.log(recipesData);
      } catch (error) {
        console.log("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [category]);

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

  console.log("test",recipes)
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.title}>{category} Recipes</Text>
          <FlatList
            data={recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.recipeList}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  recipeName: {
    textAlign: "center",
    marginTop: 12,
    fontFamily: "psbold",
    fontSize: 14,
    color: "#67666D",
  },
  recipeList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
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
