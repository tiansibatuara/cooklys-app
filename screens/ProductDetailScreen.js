import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="black"
          />
            <Text>{recipe.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logo: {
    width: 20,
    height: 20,
    // Add any additional styling for the logo image
  },
});

export default ProductDetailScreen;
