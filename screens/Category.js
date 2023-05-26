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
        const querySnapshot = await getDocs(
          query(collection(db, "recipes"), where("categories", "==", category))
        );
        const recipesData = querySnapshot.docs.map((doc) => doc.data());
        setRecipes(recipesData);
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

  let categoryName = "";
  switch (category) {
    case "app":
      categoryName = "Appetizer";
      break;
    case "main":
      categoryName = "Main";
      break;
    case "des":
      categoryName = "Dessert";
      break;
    case "veg":
      categoryName = "Vegan";
      break;
    case "mic":
      categoryName = "Michelin";
      break;
    default:
      categoryName = "";
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="black"
            suppressHighlighting={true}
          />
          <View>
            <Text style={styles.titleText}>Recipes</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.title}>{categoryName} Recipes</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 4,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
    justifyContent: "center",
  },
  orderName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderQuantity: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    marginHorizontal: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    padding: 12,
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
    paddingBottom: 12,
    flexDirection: "row",
  },
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
});
