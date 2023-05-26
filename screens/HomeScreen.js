import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Categories from "../components/Categories";
import Popular from "../components/Popular";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate("SearchResults", { searchQuery });
  };

  const handleCart = () => {
    navigation.navigate("Cart");
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>
          Share the flavors, what are{"\n"}you cooking up today?
        </Text>

        {/* Search Bar */}
        <View style={styles.searchAndCart}>
          <View style={styles.searchBar}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Search recipes here"
                value={searchQuery}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
            </View>
            <Ionicons
              onPress={handleSearch}
              name="ios-search-outline"
              size={24}
              suppressHighlighting={true}
              color="black"
            />
          </View>
          <Ionicons
            onPress={handleCart}
            name="ios-cart-outline"
            size={24}
            color="black"
            suppressHighlighting={true}
          />
        </View>

        {/* Categories Component */}
        <Categories />

        {/* Popular Recipes Component */}
        <Popular />
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
  header: {
    fontFamily: "psbold",
    fontSize: 28,
    paddingBottom: 12,
  },
  searchBar: {
    padding: 12,
    marginVertical: 12,
    flexDirection: "row",
    width: "88%",
    alignItems: "center",
    borderWidth: 0.8,
    justifyContent: "space-between",
    backgroundColor: "#FCFCFD",
    borderColor: "#C0C0C0",
    borderRadius: 10,
  },
  inputContainer: {
    width: "70%",
  },
  searchAndCart: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
});

export default HomeScreen;
