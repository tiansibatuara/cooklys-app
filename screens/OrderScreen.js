import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../config";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";


const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const myUserUid = auth.currentUser.uid;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("uid", "==", myUserUid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
        console.log(ordersData)
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Remove orders as a dependency

  const handleOrderPress = (order) => {
    console.log("Passed data: ", order)
    navigation.navigate("OrderDetail", { order });
  };

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
      <ScrollView styles={styles.contentContainer}>
        {orders.map((order, index) => (
          <Pressable
            key={index}
            style={styles.orderCard}
            onPress={() => handleOrderPress(order)}
          >
            <Text style={styles.orderTitle}>Order {index + 1}</Text>
            <Text>List of order:</Text>
            {Object.keys(order.orders).map((key) => (
              <View key={key}>
                <Text>Name: {order.orders[key].name}</Text>
                {/* Render other properties as needed */}
              </View>
            ))}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: "black",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 4,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  topBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8, // PENTING SAMAIN
    backgroundColor: "white",

  },
  contentContainer: {
    // paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "64%",
    alignItems: "center",
    paddingBottom: 12,
    flexDirection: "row",
    backgroundColor: "white",
  },
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
});
