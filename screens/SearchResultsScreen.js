import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import recipes from "../data/Recipes";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";



const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { searchQuery } = route.params;

  const renderFilteredItem = ({ item }) => {
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

  const filteredRecipes = searchQuery
  ? recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        recipe.name.toLowerCase().startsWith(searchQuery.toLowerCase().trim())
    )
  : [];


  

  // Filter the data source (e.g., recipes) based on the searchQuery
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.topBar}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="black"
            suppressHighlighting={true}
          />
        </View>
        
        <Text style={styles.header}>Search Results for: {searchQuery}</Text>

        {filteredRecipes.length > 0 ? (
          <FlatList
            data={filteredRecipes}
            renderItem={renderFilteredItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.recipeList}
            numColumns={2}
          />
        ) : (
          <Text style={styles.noResultsText}>Search results not found</Text>
        )}
      </ScrollView>
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
  topBar: {
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontFamily: "psbold",
    fontSize: 20,
  },
  logo: {
    width: 20,
    height: 20,
    // Add any additional styling for the logo image
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
  noResultsText: {
    textAlign: "center",
    fontFamily: "psbold",
    fontSize: 16,
    marginTop: 20,
  },
});

export default SearchResultsScreen;