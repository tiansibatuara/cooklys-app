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
  decrementQuantity,
  incrementQuantity,
  emptyQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty, emptyQty } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
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

  const placeOrder = async () => {
    navigation.navigate("MainNavigator");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
      },
      {
        merge: true,
      }
    );
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
      <ScrollView>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
        </View>
        <View
          style={{
            borderRadius: 12,
            margin: 10,
            padding: 10,
            backgroundColor: "white",
            gap: 15,
          }}
        >
          {cart.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: "white",
                borderRadius: 15,
              }}
              key={index}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>
                    {formatter.format(item.price)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.foodQuantity}>x{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
          <Text style={styles.totalPrice}>{formatter.format(total)}</Text>
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
              <Ionicons name="md-cash" size={30} color={"black"} />
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
    width: 40,
    height: 40,
    borderRadius: 10,
    resizeMode: "contain",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 295,
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
    fontWeight: "bold",
    color: "red",
    textAlign: "right",
    marginBottom: 10,
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
});
