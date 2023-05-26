import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config";
import { decrementQty, incrementQty, emptyQty } from "../ProductReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
  emptyQuantity,
} from "../CartReducer";

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  return (
    //     <SafeAreaView style={styles.container}>
    //       <ScrollView style={styles.contentContainer}>

    //         {total === 0 ? (
    //           <View style={{ justifyContent: "center", alignItems: "center" }}>
    //             <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
    //           </View>
    //         ) : (

    //         )
    // }
    //       </ScrollView>
    //
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
            <Text style={styles.titleText}>Cart</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentContainer}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                borderRadius: 12,
                marginBottom: 8,
                gap: 6,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 15,
                    backgroundColor: "white",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    // borderRadius: 12,
                  }}
                  key={index}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.innerContainer}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.foodName}>{item.name}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                      <Pressable
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          alignItems: "center",
                          borderRadius: 10,
                          backgroundColor: "black",
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            dispatch(decrementQuantity(item)); // cart
                            dispatch(decrementQty(item)); // product
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: "white",
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}
                          >
                            -
                          </Text>
                        </Pressable>

                        <Pressable>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "white",
                              paddingHorizontal: 8,
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => {
                            dispatch(incrementQuantity(item)); // cart
                            dispatch(incrementQty(item)); //product
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: "white",
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}
                          >
                            +
                          </Text>
                        </Pressable>
                      </Pressable>
                      <Text style={styles.foodPrice}>
                        {formatter.format(item.price * item.quantity)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {total > 0 ? (
        <Pressable
          onPress={() => navigation.navigate("Checkout")}
          style={{
            backgroundColor: "#4169E1",
            paddingVertical: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
              fontWeight: "600",
              textAlign: "center",
              fontFamily: "psbold",
            }}
          >
            Place Order
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#4169E1",
            paddingVertical: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Shop
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8, // PENTING SAMAIN
  },
  contentContainer: {
    // paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
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
  screenTitle: {
    fontSize: 34,
    color: "black",
    fontWeight: "700",
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 10,
    resizeMode: "cover",
  },
  innerContainer: {
    flexDirection: "column",
    width: 220,
    gap: 20,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: 15,
    fontWeight: "700",
    color: "black",
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "black",
  },
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "55%",
    alignItems: "center",
  },
});
