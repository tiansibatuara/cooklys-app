import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  emptyQuantity,
} from "../CartReducer";
import {
  getProducts,
  resetQuantity,
} from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../config";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  console.log(total);

  const userUid = auth.currentUser.uid;

  //   const placeOrder = async () => {
  //     navigation.navigate("Home");
  //     dispatch(cleanCart());
  //     await setDoc(
  //       doc(db, "orders", `${userUid}`),
  //       {
  //         orders: { ...cart },
  //       },
  //       {
  //         merge: true,
  //       }
  //     );
  //   };

  const placeOrder = async () => {
    navigation.navigate("Home");
    dispatch(cleanCart());
    dispatch(emptyQuantity()); // Reset quantity in cart
    dispatch(resetQuantity());
    const orderData = {
      uid: userUid,
      orders: { ...cart },
    };
    const ordersCollectionRef = collection(db, "orders");
    await addDoc(ordersCollectionRef, orderData);
  };

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

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
            <Text style={styles.titleText}>Check Out</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View
          style={{
            // margin: 10,
            // paddingHorizontal: 10,
            // backgroundColor: "black",
            gap: 4,
          }}
        >
          {cart.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                gap: 8,
                backgroundColor: "white",
              }}
              key={index}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <View style={styles.foodPriceContainer}>
                    <Text style={styles.foodPrice}>
                      {formatter.format(item.price)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.foodQuantity}>x {item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.subtotalContainer}>
            <Text style={{ fontFamily: "psbold" }}>Subtotal</Text>
            <Text style={styles.totalPrice}>{formatter.format(total)}</Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 12,
            margin: 10,
            padding: 10,
            backgroundColor: "white",
            gap: 15,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              width: 100,
              height: 70,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderRadius: 25,
                backgroundColor: "white",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="cash-outline" size={24} color="black" />
            </View>
          </View>
          <View>
            <Text style={styles.paymentMethod}>Cash</Text>
            <Text style={styles.discount}>No discount available</Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 12,
            margin: 10,
            padding: 10,
            backgroundColor: "white",
            gap: 15,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 100,
              height: 70,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fontisto name="shopping-bag" size={60} color="black" />
          </View>
          <View>
            <Text style={styles.paymentMethod}>Pickup</Text>
            <Text style={styles.discount}>IDR 0</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 13 }}>Total</Text>
          <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>
            {formatter.format(total)}
          </Text>
        </View>
        <Pressable
          onPress={placeOrder}
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
            Place Order
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    color: "red",
    fontWeight: "700",
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 10,
    resizeMode: "contain",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    // backgroundColor: "black",
    width: "85%",
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
    fontSize: 14,
    fontFamily: "psbold",
    fontWeight: "700",
    color: "black",
    // backgroundColor: "blue",
  },
  foodPrice: {
    justifyContent: "flex-start",
    fontFamily: "psbold",
    fontSize: 12,
    fontWeight: "700",
    color: "black",
  },
  foodQuantity: {
    fontSize: 13,
    color: "blue",
  },
  totalPrice: {
    fontSize: 16,
    fontFamily: "psbold",
    color: "black",
    textAlign: "right",
    // marginBottom: 10,
    // backgroundColor: "black",
  },
  paymentMethod: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  discount: {
    fontSize: 13,
    color: "blue",
  },
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
  foodPriceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "yellow",
    width: "36%",
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
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "63%",
    alignItems: "center",
  },
  subtotalContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    // height: 40,
  },
});
