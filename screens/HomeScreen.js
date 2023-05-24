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

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate("SearchResults", { searchQuery });
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>
          Share the flavors, what are{"\n"}you cooking up today?
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search recipes here"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome onPress={handleSearch} name="search" size={24} color="black" />
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
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    backgroundColor: "#FCFCFD",
    borderColor: "#C0C0C0",
    borderRadius: 10,
  },
});

export default HomeScreen;
